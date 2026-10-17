import { sql } from "@/lib/db";

export async function GET() {
  try {
    const result = await sql`
      SELECT current_database() AS database,
             NOW() AS server_time
    `;

    return Response.json({
      success: true,
      message: "Connected to Neon!",
      ...result[0],
    });
  } catch (error) {
    console.error("Database test failed:", error);

    return Response.json(
      { success: false, message: "Database connection failed" },
      { status: 500 }
    );
  }
}