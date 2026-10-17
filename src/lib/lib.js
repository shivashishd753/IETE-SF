
import "server-only";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { sql } from "@/lib/db";

const secret = process.env.SESSION_SECRET;
const key =
  secret && secret.length >= 32
    ? new TextEncoder().encode(secret)
    : null;

export async function getCurrentMember() {
  if (!key) {
    throw new Error("SESSION_SECRET is missing or invalid.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("iete_session")?.value;

  if (!token) return null;

  let payload;

  try {
    ({ payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    }));
  } catch {
    return null;
  }

  const memberId = Number(payload.sub);

  if (!Number.isSafeInteger(memberId) || memberId <= 0) {
    return null;
  }

  const rows = await sql`
    SELECT id, user_id, email, role
    FROM members
    WHERE id = ${memberId}
      AND is_active = TRUE
    LIMIT 1
  `;

  return rows[0] ?? null;
}
