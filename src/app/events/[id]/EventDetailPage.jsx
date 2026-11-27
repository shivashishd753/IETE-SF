"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Users,
  Trophy,
} from "lucide-react";
import eventDetails from "./eventDetails";

const infoIcons = {
  date: CalendarDays,
  venue: MapPin,
  format: Users,
};

// Turns "Minefield Rescue" into "minefield-rescue" (must match the events page).
const slugify = (text) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Ignore capitals, spaces, dashes and dots when matching titles.
const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

const normalizedDetails = Object.fromEntries(
  Object.entries(eventDetails).map(([key, value]) => [norm(key), value])
);

// Fetch with a timeout so the page can never hang on "Loading" forever.
async function fetchWithTimeout(url, ms = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

export default function EventDetailPage() {
  const params = useParams();
  // This is now the event name in the URL (e.g. "minefield-rescue").
  // Old numeric links such as /events/2 still work too.
  const rawParam = String(
    Array.isArray(params?.id) ? params.id[0] : params?.id ?? ""
  );
  let eventId = rawParam;
  try {
    eventId = decodeURIComponent(rawParam);
  } catch {
    eventId = rawParam;
  }

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  // READ-ONLY: uses the same public API your events page already uses.
  const loadEvent = useCallback(async () => {
    let lastError = null;

    // Try up to 3 times before giving up.
    for (let i = 0; i < 3; i++) {
      try {
        const response = await fetchWithTimeout("/api/events/public");
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load event.");
        }

        const list = Array.isArray(data.events) ? data.events : [];
        const wanted = slugify(eventId);
        const found =
          list.find((item) => slugify(item.title) === wanted) ||
          list.find((item) => String(item.id) === eventId);

        return { event: found || null, error: "" };
      } catch (err) {
        lastError = err;
        console.error("Event detail fetch failed (try " + (i + 1) + "):", err);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    }

    return {
      event: null,
      error:
        lastError?.name === "AbortError"
          ? "The request took too long. Please try again."
          : lastError?.message || "Unable to load event.",
    };
  }, [eventId]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    loadEvent().then((result) => {
      if (cancelled) return;
      setEvent(result.event);
      setError(result.error);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [loadEvent, attempt]);

  // Extra content: match by the event's title.
  const extra =
    (event ? normalizedDetails[norm(event.title)] : null) ||
    normalizedDetails[norm(eventId)] ||
    {};

  // Dark ombre: the events page navy (#111722) blending down into black,
  // with soft blue glows in two corners so it never looks flat black.
  const bg = "min-h-screen text-white";
  const ombreStyle = {
    backgroundColor: "#090B10",
    backgroundImage: [
      "radial-gradient(ellipse 70% 45% at 0% 0%, rgba(62,84,124,0.42) 0%, rgba(62,84,124,0) 70%)",
      "radial-gradient(ellipse 60% 40% at 100% 100%, rgba(44,60,94,0.38) 0%, rgba(44,60,94,0) 70%)",
      "linear-gradient(160deg, #1A2538 0%, #111722 38%, #0B0E15 72%, #06070A 100%)",
    ].join(", "),
  };

  const buttonClass =
    "inline-flex items-center justify-center gap-3 rounded-lg border border-[#46536A] bg-[#151B25] px-6 py-3.5 text-sm font-semibold text-[#C3CDDE] transition-colors duration-300 hover:border-[#687895] hover:bg-[#202A39] hover:text-white";

  const backLink = (
    <Link
      href="/events"
      className="inline-flex items-center gap-2 text-sm font-semibold text-[#9AA7BD] transition-colors hover:text-white"
    >
      <ArrowLeft size={16} />
      Back to Events
    </Link>
  );

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <main className={bg} style={ombreStyle}>
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="mb-8">{backLink}</div>
          <div className="grid animate-pulse grid-cols-1 gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] lg:gap-14">
            <div className="mx-auto aspect-[4/5] w-full max-w-sm rounded-2xl bg-white/5 md:max-w-none" />
            <div>
              <div className="h-7 w-40 rounded bg-white/5" />
              <div className="mt-6 h-14 w-3/4 rounded bg-white/5" />
              <div className="mt-6 h-5 w-full rounded bg-white/5" />
              <div className="mt-3 h-5 w-2/3 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ---------------- ERROR / NOT FOUND ---------------- */

  if (error || !event) {
    return (
      <main
        className={`${bg} flex flex-col items-center justify-center gap-6 px-6 text-center`}
        style={ombreStyle}
      >
        <CalendarDays className="h-10 w-10 text-[#8192AF]" />
        <h1 className="text-2xl font-semibold">
          {error ? "Unable to load event" : "Event not found"}
        </h1>
        <p className="max-w-sm text-sm text-[#9299A5]">
          {error || "This event may have been removed or is not published."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {error && (
            <button
              type="button"
              onClick={() => setAttempt((n) => n + 1)}
              className={buttonClass}
            >
              Try again
            </button>
          )}
          {backLink}
        </div>
      </main>
    );
  }

  /* ---------------- PAGE ---------------- */

  const info =
    extra.info && typeof extra.info === "object"
      ? Object.entries(extra.info).filter(([, v]) => v)
      : [];

  const about = Array.isArray(extra.about) ? extra.about : [];
  const highlights = Array.isArray(extra.highlights) ? extra.highlights : [];
  const winners = Array.isArray(extra.winners) ? extra.winners : [];
  const gallery = Array.isArray(extra.gallery) ? extra.gallery : [];

  const isLive = event.status === "live";

  return (
    <main className={bg} style={ombreStyle}>
      {/* No Navbar here on purpose. */}
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-8">{backLink}</div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
          {/* ================= LEFT: POSTER ================= */}
          <aside>
            <div className="mx-auto max-w-sm md:sticky md:top-8 md:max-w-none">
              {event.poster_url ? (
                <img
                  src={event.poster_url}
                  alt={event.title || "Event poster"}
                  className="w-full rounded-2xl border border-[#292E38] bg-[#11141A] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center rounded-2xl border border-[#292E38] bg-[#171B23]">
                  <CalendarDays className="h-14 w-14 text-[#8192AF]/50" />
                </div>
              )}
            </div>
          </aside>

          {/* ================= RIGHT: INFORMATION ================= */}
          <section className="min-w-0">
            {/* Category + status */}
            <div className="flex flex-wrap items-center gap-3">
              {event.category && (
                <span className="rounded-lg border border-white/10 bg-[#11141A] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C0C9D8]">
                  {event.category}
                </span>
              )}
              {event.status && (
                <span
                  className={`rounded-lg border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                    isLive
                      ? "border-red-400/25 bg-[#171114] text-red-200"
                      : "border-[#343B48] bg-[#11141A] text-[#9299A5]"
                  }`}
                >
                  {isLive ? "Live now" : event.status}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#F1F2F4] sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>

            {extra.tagline && (
              <p className="mt-5 border-l-2 border-[#53617A] pl-4 text-base italic leading-7 text-[#B4BECE] sm:text-lg">
                {extra.tagline}
              </p>
            )}

            {/* Actions */}
            {(event.rule_book_url ||
              (isLive && event.registration_url)) && (
              <div className="mt-7 flex flex-wrap gap-3">
                {isLive && event.registration_url && (
                  <a
                    href={event.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass}
                  >
                    Register Now
                    <ArrowUpRight size={18} />
                  </a>
                )}
                {event.rule_book_url && (
                  <a
                    href={event.rule_book_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass}
                  >
                    Rule Book
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </div>
            )}

            {/* Quick info */}
            {info.length > 0 && (
              <dl className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {info.map(([key, value]) => {
                  const Icon = infoIcons[key] || CalendarDays;
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-[#292E38] bg-[#11141A] p-4"
                    >
                      <dt className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8998B1]">
                        <Icon size={14} />
                        {key}
                      </dt>
                      <dd className="mt-2 text-sm font-medium text-[#E7E9ED]">
                        {value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}

            {/* About: uses your text from eventDetails.js, otherwise the
                description that comes from the backend */}
            <div className="mt-11">
              <h2 className="text-xl font-semibold text-[#F1F2F4]">
                About the Event
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[#9AA1AE] sm:text-base">
                {about.length > 0 ? (
                  about.map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p>
                    {event.description ||
                      "More details about this event will be added soon."}
                  </p>
                )}
              </div>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="mt-11">
                <h2 className="text-xl font-semibold text-[#F1F2F4]">
                  Highlights
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex gap-3 rounded-xl border border-[#292E38] bg-[#11141A] p-4 text-sm leading-6 text-[#C0C4CC]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8192AF]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Winners */}
            {winners.length > 0 && (
              <div className="mt-11">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-[#F1F2F4]">
                  <Trophy size={20} className="text-[#8192AF]" />
                  Winners
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {winners.map((w, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-[#292E38] bg-[#11141A] p-4"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8998B1]">
                        {w.position}
                      </p>
                      <p className="mt-2 text-sm font-medium text-[#E7E9ED]">
                        {w.name}
                      </p>
                      {Array.isArray(w.members) && w.members.length > 0 && (
                        <ul className="mt-2 space-y-0.5 text-xs leading-5 text-[#9299A5]">
                          {w.members.map((m, j) => (
                            <li key={j}>{m}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery (only if you add photos later) */}
            {gallery.length > 0 && (
              <div className="mt-11">
                <h2 className="text-xl font-semibold text-[#F1F2F4]">
                  Gallery
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {gallery.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${event.title} photo ${i + 1}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-xl border border-[#292E38] object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}