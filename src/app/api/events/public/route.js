
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { syncEventStatuses } from "@/lib/event-status";

export async function GET() {
  try {
    // Update scheduled event statuses before retrieving them.
    await syncEventStatuses();

    const events = await sql`
      SELECT
        id,
        title,
        slug,
        description,
        category,
        status,
        starts_at,
        ends_at,
        location,
        registration_url,
        poster_url,
        rule_book_url,
        video_url,
        sort_order
      FROM events
      WHERE is_published = TRUE
      ORDER BY
        CASE status
          WHEN 'live' THEN 1
          WHEN 'upcoming' THEN 2
          WHEN 'past' THEN 3
        END,
        sort_order ASC,
        starts_at ASC NULLS LAST,
        created_at DESC
    `;

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Public events fetch error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch events." },
      { status: 500 }
    );
  }
}
