
import "server-only";
import { sql } from "@/lib/db";

// Validate the event schedule before saving.
export function validateEventTimes(startsAt, endsAt) {
  if (!startsAt || !endsAt) {
    return "Both event start and end date/time are required.";
  }

  const start = new Date(startsAt);
  const end = new Date(endsAt);

  if (Number.isNaN(start.getTime())) {
    return "Invalid event start date and time.";
  }

  if (Number.isNaN(end.getTime())) {
    return "Invalid event end date and time.";
  }

  if (end <= start) {
    return "End date and time must be after the start date and time.";
  }

  return null;
}

// Always calculate status from the event schedule.
export function getEffectiveEventStatus(
  { starts_at, ends_at },
  now = new Date()
) {
  if (!starts_at || !ends_at) {
    throw new Error("Event start and end times are required.");
  }

  const start = new Date(starts_at);
  const end = new Date(ends_at);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end <= start
  ) {
    throw new Error("Invalid event schedule.");
  }

  if (now < start) return "upcoming";
  if (now < end) return "live";

  return "past";
}

// Synchronize scheduled event statuses in the database.
export async function syncEventStatuses() {
  await sql`
    UPDATE events
    SET
      status = CASE
        WHEN CURRENT_TIMESTAMP < starts_at THEN 'upcoming'
        WHEN CURRENT_TIMESTAMP < ends_at THEN 'live'
        ELSE 'past'
      END,

      is_featured = CASE
        WHEN CURRENT_TIMESTAMP >= starts_at
          AND CURRENT_TIMESTAMP < ends_at
          THEN is_featured
        ELSE FALSE
      END

    WHERE starts_at IS NOT NULL
      AND ends_at IS NOT NULL
      AND ends_at > starts_at
      AND (
        status IS DISTINCT FROM CASE
          WHEN CURRENT_TIMESTAMP < starts_at THEN 'upcoming'
          WHEN CURRENT_TIMESTAMP < ends_at THEN 'live'
          ELSE 'past'
        END

        OR (
          is_featured = TRUE
          AND (
            CURRENT_TIMESTAMP < starts_at
            OR CURRENT_TIMESTAMP >= ends_at
          )
        )
      )
  `;
}
