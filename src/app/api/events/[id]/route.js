
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentMember } from "@/lib/lib";

const allowedStatuses = ["upcoming", "live", "past"];

function validId(value) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function createSlug(title) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${base}-${Date.now()}`;
}

// GET: Retrieve one event.
export async function GET(request, { params }) {
  try {
    const member = await getCurrentMember();

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: rawId } = await params;
    const id = validId(rawId);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid event ID" },
        { status: 400 }
      );
    }

    const rows = await sql`
      SELECT *
      FROM events
      WHERE id = ${id}
      LIMIT 1
    `;

    if (!rows.length) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      event: rows[0],
    });
  } catch (error) {
    console.error("GET individual event error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to retrieve event" },
      { status: 500 }
    );
  }
}

// PATCH: Update an event.
export async function PATCH(request, { params }) {
  try {
    const member = await getCurrentMember();

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: rawId } = await params;
    const id = validId(rawId);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid event ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const existingRows = await sql`
      SELECT *
      FROM events
      WHERE id = ${id}
      LIMIT 1
    `;

    if (!existingRows.length) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    const existing = existingRows[0];

    const allowedFields = [
      "title",
      "description",
      "category",
      "status",
      "starts_at",
      "ends_at",
      "location",
      "registration_url",
      "poster_url",
      "video_url",
      "is_published",
      "is_featured",
      "sort_order",
    ];

    const hasAllowedField = allowedFields.some((field) =>
      Object.prototype.hasOwnProperty.call(body, field)
    );

    if (!hasAllowedField) {
      return NextResponse.json(
        { success: false, message: "No valid fields provided" },
        { status: 400 }
      );
    }

    const title = Object.hasOwn(body, "title")
      ? body.title
      : existing.title;

    const status = Object.hasOwn(body, "status")
      ? body.status
      : existing.status;

    const isFeatured = Object.hasOwn(body, "is_featured")
      ? body.is_featured
      : existing.is_featured;

    const isPublished = Object.hasOwn(body, "is_published")
      ? body.is_published
      : existing.is_published;

    const sortOrder = Object.hasOwn(body, "sort_order")
      ? body.sort_order
      : existing.sort_order;

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "A valid title is required" },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid event status" },
        { status: 400 }
      );
    }

    if (
      typeof isFeatured !== "boolean" ||
      typeof isPublished !== "boolean"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid publishing settings" },
        { status: 400 }
      );
    }

    if (!Number.isInteger(sortOrder)) {
      return NextResponse.json(
        { success: false, message: "Sort order must be an integer" },
        { status: 400 }
      );
    }

    if (isFeatured && status !== "live") {
      return NextResponse.json(
        { success: false, message: "Only live events can be featured" },
        { status: 400 }
      );
    }

    const slug =
      title.trim() === existing.title
        ? existing.slug
        : createSlug(title);

    // Clear the previous featured event before featuring this one.
    if (isFeatured) {
      await sql`
        UPDATE events
        SET is_featured = FALSE
        WHERE is_featured = TRUE
          AND id <> ${id}
      `;
    }

    const result = await sql`
      UPDATE events
      SET
        title = ${title.trim()},
        slug = ${slug},
        description = ${Object.hasOwn(body, "description") ? body.description : existing.description},
        category = ${Object.hasOwn(body, "category") ? body.category : existing.category},
        status = ${status},
        starts_at = ${Object.hasOwn(body, "starts_at") ? body.starts_at : existing.starts_at},
        ends_at = ${Object.hasOwn(body, "ends_at") ? body.ends_at : existing.ends_at},
        location = ${Object.hasOwn(body, "location") ? body.location : existing.location},
        registration_url = ${Object.hasOwn(body, "registration_url") ? body.registration_url : existing.registration_url},
        poster_url = ${Object.hasOwn(body, "poster_url") ? body.poster_url : existing.poster_url},
        video_url = ${Object.hasOwn(body, "video_url") ? body.video_url : existing.video_url},
        is_published = ${isPublished},
        is_featured = ${status === "live" ? isFeatured : false},
        sort_order = ${sortOrder},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      message: "Event updated successfully",
      event: result[0],
    });
  } catch (error) {
    console.error("PATCH event error:", error);

    if (error.code === "23505") {
      return NextResponse.json(
        { success: false, message: "An event with this slug already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Unable to update event" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an event.
export async function DELETE(request, { params }) {
  try {
    const member = await getCurrentMember();

    if (!member) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: rawId } = await params;
    const id = validId(rawId);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Invalid event ID" },
        { status: 400 }
      );
    }

    const result = await sql`
      DELETE FROM events
      WHERE id = ${id}
      RETURNING id, title
    `;

    if (!result.length) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
      deletedEvent: result[0],
    });
  } catch (error) {
    console.error("DELETE event error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete event" },
      { status: 500 }
    );
  }
}
