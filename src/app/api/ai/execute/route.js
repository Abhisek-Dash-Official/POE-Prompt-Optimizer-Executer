import { streamText, createTextStreamResponse } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { NextResponse } from 'next/server';
import { getUserUid } from "@/lib/jwt";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { MAX_DAILY_TOKENS_LIMIT_PER_USER } from "@/config/server";

const groq = createGroq();

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
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json({ error: "The 'prompt' field is required." }, { status: 400 });
        }

        const remainingTokens = Math.max(0, MAX_DAILY_TOKENS_LIMIT_PER_USER - user.dailyTokensUsed);
        const headers = {
            'X-Tokens-Used': user.dailyTokensUsed.toString(),
            'X-Tokens-Limit': MAX_DAILY_TOKENS_LIMIT_PER_USER.toString(),
            'X-Tokens-Remaining': remainingTokens.toString(),
        };

        const result = streamText({
            model: groq('llama3-8b-8192'),
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert AI assistant. Strictly follow the instructions, formatting, and constraints provided in the user prompt to give the final output.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.5,

            async onFinish({ usage }) {
                if (usage && usage.totalTokens) {
                    try {
                        await connectToDatabase();
                        await User.updateOne(
                            { _id: uid },
                            { $inc: { dailyTokensUsed: usage.totalTokens } }
                        );
                    } catch (dbError) {
                        console.error("Failed to update tokens after execution stream:", dbError);
                    }
                }
            }
        });

        return createTextStreamResponse(result.stream, { headers });

    } catch (error) {
        console.error("API Error [POST /api/ai/execute]:", error);
        return NextResponse.json(
            { error: "An internal server error occurred while executing the prompt." },
            { status: 500 }
        );
    }
}