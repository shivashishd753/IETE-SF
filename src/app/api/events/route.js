
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentMember } from "@/lib/lib";

const allowedStatuses = ["upcoming", "live", "past"];

function createSlug(title) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${base}-${Date.now()}`;
}

// GET: Retrieve all events for the management dashboard.
export async function GET() {
  try {
    const member = await getCurrentMember();

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const events = await sql`
      SELECT *
      FROM events
      ORDER BY sort_order ASC, created_at DESC
    `;

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("GET events error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to retrieve events" },
      { status: 500 }
    );
  }
}

// POST: Create a new event.
export async function POST(request) {
  try {
    const member = await getCurrentMember();

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      title,
      description = null,
      category = null,
      status = "upcoming",
      starts_at = null,
      ends_at = null,
      location = null,
      registration_url = null,
      poster_url = null,
      video_url = null,
      is_published = false,
      is_featured = false,
      sort_order = 0,
    } = body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Event title is required" },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid event status" },
        { status: 400 }
      );
    }

    if (typeof is_published !== "boolean" ||
        typeof is_featured !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Invalid publishing settings" },
        { status: 400 }
      );
    }

    if (is_featured && status !== "live") {
      return NextResponse.json(
        { success: false, message: "Only live events can be featured" },
        { status: 400 }
      );
    }

    const slug = createSlug(title);

    const result = await sql`
      INSERT INTO events (
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
        video_url,
        is_published,
        is_featured,
        sort_order,
        created_by
      )
      VALUES (
        ${title.trim()},
        ${slug},
        ${description},
        ${category},
        ${status},
        ${starts_at},
        ${ends_at},
        ${location},
        ${registration_url},
        ${poster_url},
        ${video_url},
        ${is_published},
        ${is_featured},
        ${Number.isInteger(sort_order) ? sort_order : 0},
        ${member.id}
      )
      RETURNING *
    `;

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        event: result[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST event error:", error);

    if (error.code === "23505") {
      return NextResponse.json(
        { success: false, message: "An event with this unique value already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Unable to create event" },
      { status: 500 }
    );
  }
}
