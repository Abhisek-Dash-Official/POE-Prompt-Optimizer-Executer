import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const totalUsers = await User.countDocuments({});
        const totalPages = Math.ceil(totalUsers / limit);

        const users = await User.find({})
            .select("username email role dailyTokensUsed createdAt avatar_id")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            users,
            pagination: {
                totalUsers,
                totalPages,
                currentPage: page,
                limit
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Admin Users API Error:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}