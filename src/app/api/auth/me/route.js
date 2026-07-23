import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { getUserUid } from "@/lib/jwt";
import { MAX_DAILY_TOKENS_LIMIT_PER_USER } from "@/config/server";

export async function GET(req) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        const uid = await getUserUid(token);

        if (!uid) {
            return NextResponse.json({ error: "Unauthorized: Invalid or expired token" }, { status: 401 });
        }

        await connectToDatabase();
        const user = await User.findById(uid);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const now = new Date();
        const lastReset = new Date(user.lastTokenResetDate);
        let currentTokensUsed = user.dailyTokensUsed;

        if (now.toDateString() !== lastReset.toDateString()) {
            await User.updateOne(
                { _id: uid },
                { $set: { dailyTokensUsed: 0, lastTokenResetDate: now } }
            );
            currentTokensUsed = 0;
        }

        const remainingTokens = Math.max(0, MAX_DAILY_TOKENS_LIMIT_PER_USER - currentTokensUsed);

        return NextResponse.json(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    avatar_id: user.avatar_id
                },
                usage: {
                    used: currentTokensUsed,
                    limit: MAX_DAILY_TOKENS_LIMIT_PER_USER,
                    remaining: remainingTokens
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("API Error [GET /api/auth/me]:", error);
        return NextResponse.json(
            { error: "An internal server error occurred while fetching user data." },
            { status: 500 }
        );
    }
}