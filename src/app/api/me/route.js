
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";

const secret = process.env.SESSION_SECRET;
const key = secret ? new TextEncoder().encode(secret) : null;

export async function GET() {
  try {
    if (!key || !secret || secret.length < 32) {
      throw new Error("SESSION_SECRET is not configured correctly.");
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("iete_session")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: "Not logged in." },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    const memberId = Number(payload.sub);

    if (!Number.isSafeInteger(memberId) || memberId <= 0) {
      return NextResponse.json(
        { authenticated: false, message: "Invalid session." },
        { status: 401 }
      );
    }

    const rows = await sql`
      SELECT user_id, email, role
      FROM members
      WHERE id = ${memberId}
        AND is_active = TRUE
      LIMIT 1
    `;

    const member = rows[0];

    if (!member) {
      return NextResponse.json(
        { authenticated: false, message: "Account unavailable." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      member: {
        userId: member.user_id,
        email: member.email,
        role: member.role,
      },
    });
  } catch (error) {
    if (error.code === "ERR_JWT_INVALID" ||
        error.code === "ERR_JWS_INVALID" ||
        error.code === "ERR_JWT_EXPIRED" ||
        error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
      return NextResponse.json(
        { authenticated: false, message: "Invalid or expired session." },
        { status: 401 }
      );
    }

    console.error("Session verification failed:", error.message);

    return NextResponse.json(
      { authenticated: false, message: "Unable to verify session." },
      { status: 500 }
    );
  }
}
