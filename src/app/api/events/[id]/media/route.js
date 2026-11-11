
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { sql } from "@/lib/db";
import { getCurrentMember } from "@/lib/lib";
import { storage, EVENT_MEDIA_BUCKET } from "@/lib/storage";

// export const runtime = "nodejs";

const MAX_POSTER_SIZE = 5 * 1024 * 1024;
const MAX_RULEBOOK_SIZE = 10 * 1024 * 1024;

const POSTER_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function validId(value) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function POST(request, { params }) {
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

    const events = await sql`
      SELECT id FROM events WHERE id = ${id} LIMIT 1
    `;

    if (!events.length) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const mediaType = formData.get("mediaType");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Please select a file" },
        { status: 400 }
      );
    }

    let extension;
    let column;
    let folder;
    let contentType;

    if (mediaType === "poster") {
      extension = POSTER_TYPES[file.type];
      column = "poster_url";
      folder = "posters";
      contentType = file.type;

      if (!extension) {
        return NextResponse.json(
          { success: false, message: "Poster must be JPG, PNG, or WEBP" },
          { status: 400 }
        );
      }

      if (file.size > MAX_POSTER_SIZE) {
        return NextResponse.json(
          { success: false, message: "Poster must not exceed 5 MB" },
          { status: 400 }
        );
      }
    } else if (mediaType === "rulebook") {
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { success: false, message: "Rule Book must be a PDF" },
          { status: 400 }
        );
      }

      if (file.size > MAX_RULEBOOK_SIZE) {
        return NextResponse.json(
          { success: false, message: "Rule Book must not exceed 10 MB" },
          { status: 400 }
        );
      }

      extension = "pdf";
      column = "rule_book_url";
      folder = "rulebooks";
      contentType = "application/pdf";
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid media type" },
        { status: 400 }
      );
    }

    const key = `events/${id}/${folder}/${randomUUID()}.${extension}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    await storage.send(
      new PutObjectCommand({
        Bucket: EVENT_MEDIA_BUCKET,
        Key: key,
        Body: bytes,
        ContentType: contentType,
        ContentLength: bytes.length,
        ContentDisposition:
          mediaType === "rulebook" ? "inline" : "inline",
      })
    );

    const endpoint = process.env.AWS_ENDPOINT_URL_S3.replace(/\/+$/, "");
    const publicUrl = `${endpoint}/${EVENT_MEDIA_BUCKET}/${key
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`;

let updated;

if (mediaType === "poster") {
  updated = await sql`
    UPDATE events
    SET poster_url = ${publicUrl},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, poster_url, rule_book_url
  `;
} else {
  updated = await sql`
    UPDATE events
    SET rule_book_url = ${publicUrl},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, poster_url, rule_book_url
  `;
}

    return NextResponse.json({
      success: true,
      message: "Media uploaded successfully",
      event: updated[0],
    });
  } catch (error) {
    console.error("Event media upload error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to upload media" },
      { status: 500 }
    );
  }
}
