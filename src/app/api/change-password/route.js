
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { getCurrentMember } from "@/lib/lib";

export async function POST(request) {
  try {
    // Verify logged-in member
    const member = await getCurrentMember();

    if (!member) {
      return NextResponse.json(
        { message: "Please log in again." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const currentPassword =
      typeof body.currentPassword === "string"
        ? body.currentPassword
        : "";

    const newPassword =
      typeof body.newPassword === "string"
        ? body.newPassword
        : "";

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const currentBytes = new TextEncoder().encode(currentPassword).length;
    const newBytes = new TextEncoder().encode(newPassword).length;

    if (currentBytes > 72 || newPassword.length < 12 || newBytes > 72) {
      return NextResponse.json(
        { message: "New password must be at least 12 characters and no more than 72 bytes." },
        { status: 400 }
      );
    }

    // Fetch this member's existing password hash
    const rows = await sql`
      SELECT password_hash
      FROM members
      WHERE id = ${member.id}
        AND is_active = TRUE
      LIMIT 1
    `;

    const existingHash = rows[0]?.password_hash;

    if (!existingHash) {
      return NextResponse.json(
        { message: "Account not found." },
        { status: 404 }
      );
    }

    // Verify current password
    const passwordMatches = await bcrypt.compare(
      currentPassword,
      existingHash
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { message: "Current password is incorrect." },
        { status: 401 }
      );
    }

    // Prevent reusing the same password
    const samePassword = await bcrypt.compare(
      newPassword,
      existingHash
    );

    if (samePassword) {
      return NextResponse.json(
        { message: "New password must be different from your current password." },
        { status: 400 }
      );
    }

    // Hash and update the new password
    const newHash = await bcrypt.hash(newPassword, 12);

    await sql`
      UPDATE members
      SET password_hash = ${newHash}
      WHERE id = ${member.id}
        AND is_active = TRUE
    `;

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });

  } catch (error) {
    console.error("Change password API error:", error.message);

    return NextResponse.json(
      { message: "Unable to change password right now." },
      { status: 500 }
    );
  }
}
