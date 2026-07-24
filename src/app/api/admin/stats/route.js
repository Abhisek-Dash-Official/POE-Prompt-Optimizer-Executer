import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    try {
        await connectToDatabase();

        const startOfToday = new Date();

        // Total Users
        const totalUsers = await User.countDocuments();

        // Users joined in last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const newSignups = await User.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

        // Total Tokens used today
        const tokenAgg = await User.aggregate([
            { $group: { _id: null, totalTokens: { $sum: "$dailyTokensUsed" } } }
        ]);
        const totalSystemLoad = tokenAgg.length > 0 ? tokenAgg[0].totalTokens : 0;

        // Active users today (users who used at least 1 token today)
        const activeUsers = await User.countDocuments({
            dailyTokensUsed: { $gt: 0 },
            lastTokenResetDate: { $gte: startOfToday }
        });

        // Token & Usage Analytics (Power Users)
        const powerUsers = await User.find({ dailyTokensUsed: { $gt: 0 } })
            .sort({ dailyTokensUsed: -1 })
            .limit(5)
            .select("username avatar_id dailyTokensUsed email");

        // User Demographics
        const adminCount = await User.countDocuments({ role: "admin" });
        const userCount = totalUsers - adminCount;

        // Most Popular Avatars
        const popularAvatars = await User.aggregate([
            { $group: { _id: "$avatar_id", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        return NextResponse.json({
            core_stats: { totalUsers, newSignups, totalSystemLoad, activeUsers },
            powerUsers,
            demographics: { adminCount, userCount, popularAvatars }
        }, { status: 200 });

    } catch (error) {
        console.error("Admin Stats API Error:", error);
        return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 });
    }
}