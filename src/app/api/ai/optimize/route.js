import { NextResponse } from "next/server";
import { getUserUid } from "@/lib/jwt";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { buildOptimizerPrompt } from "@/lib/prompt-templates";

const DAILY_PROMPT_LIMIT = 50;

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

        if (now.toDateString() !== lastReset.toDateString()) {
            user.dailyTokensUsed = 0;
            user.lastTokenResetDate = now;
        }

        if (user.dailyTokensUsed >= DAILY_PROMPT_LIMIT) {
            return NextResponse.json(
                { error: "Daily limit reached. Please try again tomorrow." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { task, role, tone, format, constraints, example } = body;

        if (!task) {
            return NextResponse.json({ error: "The 'task' field is required." }, { status: 400 });
        }

        const masterPrompt = buildOptimizerPrompt({ task, role, tone, format, constraints, example });

        const { text } = await generateText({
            model: google("gemini-1.5-flash"),
            prompt: masterPrompt,
            temperature: 0.7,
        });

        user.dailyTokensUsed += 1;
        await user.save();

        return NextResponse.json(
            {
                message: "Prompt optimized successfully.",
                optimizedPrompt: text.trim(),
                usage: {
                    used: user.dailyTokensUsed,
                    limit: DAILY_PROMPT_LIMIT,
                    remaining: DAILY_PROMPT_LIMIT - user.dailyTokensUsed
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