import { NextResponse } from "next/server";
import { getUserUid } from "@/lib/jwt";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { buildOptimizerPrompt } from "@/lib/prompt-templates";
import { MAX_DAILY_TOKENS_LIMIT_PER_USER } from "@/config/server";

export async function POST(req) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized: Please log in first." }, { status: 401 });
        }

        const uid = await getUserUid(token);
        if (!uid) {
            return NextResponse.json({ error: "Unauthorized: Invalid session." }, { status: 401 });
        }

        await connectToDatabase();
        const user = await User.findById(uid);
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        const now = new Date();
        const lastReset = new Date(user.lastTokenResetDate);

        // Daily Reset Check
        if (now.toDateString() !== lastReset.toDateString()) {
            await User.updateOne(
                { _id: uid },
                { $set: { dailyTokensUsed: 0, lastTokenResetDate: now } }
            );
            user.dailyTokensUsed = 0;
        }

        if (user.dailyTokensUsed >= MAX_DAILY_TOKENS_LIMIT_PER_USER) {
            return NextResponse.json(
                { error: "Daily token limit reached. Please try again tomorrow." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { task, role, tone, format, constraints, example } = body;

        if (!task) {
            return NextResponse.json({ error: "The 'task' field is required." }, { status: 400 });
        }

        const masterPrompt = buildOptimizerPrompt({ task, role, tone, format, constraints, example });

        const { text, usage } = await generateText({
            model: google("gemini-1.5-flash"),
            prompt: masterPrompt,
            temperature: 0.7,
        });

        const tokensUsed = usage?.totalTokens || 0;

        if (tokensUsed > 0) {
            await User.updateOne(
                { _id: uid },
                { $inc: { dailyTokensUsed: tokensUsed } }
            );
        }

        const newTotalUsed = user.dailyTokensUsed + tokensUsed;

        return NextResponse.json(
            {
                message: "Prompt optimized successfully.",
                optimizedPrompt: text.trim(),
                usage: {
                    used: newTotalUsed,
                    limit: MAX_DAILY_TOKENS_LIMIT_PER_USER,
                    remaining: Math.max(0, MAX_DAILY_TOKENS_LIMIT_PER_USER - newTotalUsed),
                    thisRequest: tokensUsed
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("API Error [POST /api/ai/optimize]:", error);
        return NextResponse.json(
            { error: "An internal server error occurred while optimizing the prompt." },
            { status: 500 }
        );
    }
}