
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";

const sql = neon(process.env.DATABASE_URL);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

try {
  const userId = (await rl.question("Choose member user ID: ")).trim();
  const email = (await rl.question("Member email: ")).trim();
  const password = await rl.question("Choose password (12+ characters): ");

  if (!userId || !email || password.length < 12) {
    throw new Error("Enter all fields and use a password of at least 12 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await sql`
    INSERT INTO members (user_id, email, password_hash)
    VALUES (${userId}, ${email}, ${passwordHash})
  `;

  console.log(`Account ${userId} created successfully.`);
} catch (error) {
  console.error("Account creation failed:", error.message);
  process.exitCode = 1;
} finally {
  rl.close();
}
