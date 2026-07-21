import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { username, email, password, avatar_id } = body;

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Username, email, and password are required." },
                { status: 400 }
            );
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "This email is already associated with an account." },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            hashedPassword: hashedPassword,
            avatar_id: avatar_id || "0",
        });

        return NextResponse.json(
            {
                message: "Account created successfully.",
                user: {
                    username: newUser.username,
                    email: newUser.email,
                    avatar_id: newUser.avatar_id
                }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("API Error [POST /api/auth/register]:", error);
        return NextResponse.json(
            { error: "An internal server error occurred during registration." },
            { status: 500 }
        );
    }
}