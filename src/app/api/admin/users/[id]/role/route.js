import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { getAdminUid } from "@/lib/jwt";

export async function PATCH(req, { params }) {
    try {
        const resolvedParams = await params;
        const userIdToUpdate = resolvedParams.id;

        // Security check: Find out who is making the request
        const token = req.cookies.get("token")?.value;
        const currentAdminUid = await getAdminUid(token);

        if (!currentAdminUid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (userIdToUpdate === currentAdminUid) {
            return NextResponse.json({ error: "You cannot change your own role." }, { status: 400 });
        }

        const body = await req.json();
        const { newRole } = body;

        if (!["user", "admin"].includes(newRole)) {
            return NextResponse.json({ error: "Invalid role specified." }, { status: 400 });
        }

        await connectToDatabase();

        const updatedUser = await User.findByIdAndUpdate(
            userIdToUpdate,
            { role: newRole },
            { returnDocument: 'after' }
        ).select("username email role");

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        return NextResponse.json({
            message: `User ${updatedUser.username} role updated to ${updatedUser.role}`,
            user: updatedUser
        }, { status: 200 });

    } catch (error) {
        console.error("Toggle Role API Error:", error);
        return NextResponse.json({ error: "Failed to update user role." }, { status: 500 });
    }
}