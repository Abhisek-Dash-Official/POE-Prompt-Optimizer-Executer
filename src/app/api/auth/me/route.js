import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { getUserUid } from "@/lib/jwt";

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

        return NextResponse.json(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    avatar_id: user.avatar_id
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