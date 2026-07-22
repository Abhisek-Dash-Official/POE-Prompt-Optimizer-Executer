import { streamText, createTextStreamResponse } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { NextResponse } from 'next/server';
import { getUserUid } from "@/lib/jwt";

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

        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json({ error: "The 'prompt' field is required." }, { status: 400 });
        }

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
        });

        return createTextStreamResponse(result.stream);

    } catch (error) {
        console.error("API Error [POST /api/ai/execute]:", error);
        return NextResponse.json(
            { error: "An internal server error occurred while executing the prompt." },
            { status: 500 }
        );
    }
}