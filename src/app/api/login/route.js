
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";

// export const runtime = "nodejs";

const secret = process.env.SESSION_SECRET;

if (!secret || secret.length < 32) {
  throw new Error("SESSION_SECRET must be configured.");
}

const key = new TextEncoder().encode(secret);

export async function POST(request) {
  try {
    const body = await request.json();
    const email =
      typeof body.email === "string" ? body.email.trim() : "";
    const password =
      typeof body.password === "string" ? body.password : "";

    if (
      !email ||
      !password ||
      email.length > 254 ||
      password.length > 72
    ) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 400 }
      );
    }

    const rows = await sql`
      SELECT id, user_id, email, password_hash, role
      FROM members
      WHERE email = ${email}
        AND is_active = TRUE
      LIMIT 1
    `;

    const member = rows[0];

    const passwordMatches = member
      ? await bcrypt.compare(password, member.password_hash)
      : false;

    if (!passwordMatches) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      userId: member.user_id,
      role: member.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(String(member.id))
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(key);

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set("iete_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error.message);

    return NextResponse.json(
      { message: "Unable to sign in right now." },
      { status: 500 }
    );
  }
}
