import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Both email and password are required." },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email }).select("+hashedPassword");
        if (!user) {
            return NextResponse.json(
                { error: "Invalid authentication credentials." },
                { status: 401 }
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json(
                { error: "Invalid authentication credentials." },
                { status: 401 }
            );
        }

        const payload = {
            uid: user._id.toString(),
            role: user.role,
        };

        const token = await signToken(payload);

        const response = NextResponse.json(
            {
                message: "Authentication successful.",
                user: {
                    username: user.username,
                    role: user.role,
                    avatar_id: user.avatar_id
                }
            },
            { status: 200 }
        );

        response.cookies.set({
            name: "token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60, // 7 days expiration
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("API Error [POST /api/auth/login]:", error);
        return NextResponse.json(
            { error: "An internal server error occurred during authentication." },
            { status: 500 }
        );
    }
}