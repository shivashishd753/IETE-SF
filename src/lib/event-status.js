
import "server-only";
import { sql } from "@/lib/db";

// Validate the event schedule before saving it.
export function validateEventTimes(startsAt, endsAt) {
  const start = startsAt ? new Date(startsAt) : null;
  const end = endsAt ? new Date(endsAt) : null;

  if (start && Number.isNaN(start.getTime())) {
    return "Invalid event start date and time.";
  }

  if (end && Number.isNaN(end.getTime())) {
    return "Invalid event end date and time.";
  }

  if (start && end && end <= start) {
    return "End date and time must be after the start date and time.";
  }

  return null;
}

// Calculate the effective event status.
export function getEffectiveEventStatus(
  { status, starts_at, ends_at },
  now = new Date()
) {
  // Preserve manually selected status for events without
  // a complete schedule.
  if (!starts_at || !ends_at) {
    return status;
  }

  const start = new Date(starts_at);
  const end = new Date(ends_at);

  // Preserve the existing status if legacy dates are invalid.
  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end <= start
  ) {
    return status;
  }

  if (now < start) return "upcoming";
  if (now < end) return "live";

  return "past";
}

// Synchronize scheduled events in the database.
export async function syncEventStatuses() {
  await sql`
    UPDATE events
    SET
      status = CASE
        WHEN NOW() < starts_at THEN 'upcoming'
        WHEN NOW() < ends_at THEN 'live'
        ELSE 'past'
      END,

      is_featured = CASE
        WHEN NOW() >= starts_at AND NOW() < ends_at
          THEN is_featured
        ELSE FALSE
      END

    WHERE starts_at IS NOT NULL
      AND ends_at IS NOT NULL
      AND ends_at > starts_at
      AND (
        status IS DISTINCT FROM CASE
          WHEN NOW() < starts_at THEN 'upcoming'
          WHEN NOW() < ends_at THEN 'live'
          ELSE 'past'
        END

        OR (
          is_featured = TRUE
          AND (
            NOW() < starts_at
            OR NOW() >= ends_at
          )
        )
      )
  `;
}
