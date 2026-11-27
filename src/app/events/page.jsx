"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Radio,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const tabs = ["All", "Live Events", "Past Events"];

// Turns "Minefield Rescue" into "minefield-rescue" for the page URL.
const slugify = (text) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* --------------------------------------------------
   SECTION HEADER
-------------------------------------------------- */

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8998B1] sm:text-xs">
        <span className="h-px w-8 bg-[#71819C]" />
        {eyebrow}
      </p>

      <h2 className="text-4xl font-semibold tracking-[-0.045em] text-[#F1F2F4] sm:text-5xl md:text-6xl">
        {title}
        <span className="text-[#8192AF]">.</span>
      </h2>

      {description && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-[#9299A5] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------
   EVENT CARD  (clickable -> /events/event-name)
-------------------------------------------------- */

function EventCard({ event, variant = "default" }) {
  return (
    <Link
      href={`/events/${slugify(event.title) || event.id}`}
      className="block"
    >
      <article className="group overflow-hidden rounded-2xl border border-[#292E38] bg-[#11141A] transition-all duration-300 hover:-translate-y-1 hover:border-[#53617A]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#171B23]">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              loading="lazy"
              className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                variant === "past" ? "grayscale-[15%]" : ""
              }`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1B202A] to-[#101319]">
              <CalendarDays className="h-12 w-12 text-[#8192AF]/50" />
            </div>
          )}

          {/* IMAGE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F]/95 via-[#080A0F]/20 to-transparent" />

          {/* CATEGORY */}
          <span className="absolute left-4 top-4 rounded-lg border border-white/10 bg-[#0B0E14]/80 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#C0C9D8] backdrop-blur-sm">
            {event.category}
          </span>

          {/* EVENT INFORMATION */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="mb-4 h-px w-8 bg-[#8192AF] transition-all duration-300 group-hover:w-12" />

            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {event.title}
            </h3>

            {event.description && (
              <p className="mt-3 max-h-20 overflow-hidden text-sm leading-6 text-[#C0C4CC]">
                {event.description}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

/* --------------------------------------------------
   EMPTY STATE
-------------------------------------------------- */

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-[#343B48] bg-[#11141A] px-6 text-center">
      <Icon className="mb-4 h-7 w-7 text-[#8192AF]" />

      <h3 className="text-lg font-medium text-[#E7E9ED]">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#9299A5]">
        {description}
      </p>
    </div>
  );
}

/* --------------------------------------------------
   EVENTS PAGE
-------------------------------------------------- */

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [events, setEvents] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // TOUCH SWIPE REFERENCES
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  /* --------------------------------------------------
     FETCH PUBLISHED EVENTS
  -------------------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      try {
        const response = await fetch("/api/events/public", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load events.");
        }

        if (!cancelled) {
          setEvents(data.events || []);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load events.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    const refreshInterval = setInterval(loadEvents, 30000);

    return () => {
      cancelled = true;
      clearInterval(refreshInterval);
    };
  }, []);

  // THE PUBLIC API ALREADY FILTERS PUBLISHED EVENTS
  const publishedEvents = events;

  /* --------------------------------------------------
     LIVE EVENTS FOR HERO CAROUSEL
  -------------------------------------------------- */

  const liveEvents = publishedEvents
    .filter((event) => event.status === "live")
    .sort((a, b) => {
      const orderDifference =
        Number(a.sort_order || 0) - Number(b.sort_order || 0);

      if (orderDifference !== 0) return orderDifference;

      return Number(b.id) - Number(a.id);
    });

  /* --------------------------------------------------
     UPCOMING AND PAST EVENTS
  -------------------------------------------------- */

  const upcomingEvents = publishedEvents.filter(
    (event) => event.status === "upcoming"
  );

  const pastEvents = publishedEvents.filter(
    (event) => event.status === "past"
  );

  /* --------------------------------------------------
     KEEP ACTIVE SLIDE WITHIN VALID RANGE
  -------------------------------------------------- */

  useEffect(() => {
    setActiveSlide((current) =>
      liveEvents.length > 0
        ? Math.min(current, liveEvents.length - 1)
        : 0
    );
  }, [liveEvents.length]);

  // CURRENT HERO EVENT
  const currentSlide = liveEvents[activeSlide] || null;

  /* --------------------------------------------------
     MANUAL CAROUSEL NAVIGATION
  -------------------------------------------------- */

  const goToPreviousSlide = () => {
    if (liveEvents.length <= 1) return;

    setActiveSlide(
      (current) =>
        (current - 1 + liveEvents.length) % liveEvents.length
    );
  };

  const goToNextSlide = () => {
    if (liveEvents.length <= 1) return;

    setActiveSlide(
      (current) => (current + 1) % liveEvents.length
    );
  };

  /* --------------------------------------------------
     TOUCH START
  -------------------------------------------------- */

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
    touchStartY.current = event.changedTouches[0].clientY;
  };

  /* --------------------------------------------------
     TOUCH END: HORIZONTAL SWIPE
  -------------------------------------------------- */

  const handleTouchEnd = (event) => {
    if (liveEvents.length <= 1) return;

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    // IGNORE SMALL MOVEMENTS AND VERTICAL SCROLLING
    if (
      Math.abs(deltaX) < 50 ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      goToNextSlide();
    } else {
      goToPreviousSlide();
    }
  };

  /* --------------------------------------------------
     AUTOMATIC SLIDING
  -------------------------------------------------- */

  useEffect(() => {
    if (liveEvents.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide(
        (current) => (current + 1) % liveEvents.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [liveEvents.length, isPaused]);

  /* --------------------------------------------------
     ALL EVENTS FOR CARDS
  -------------------------------------------------- */

  const allEvents = [
    ...liveEvents,
    ...upcomingEvents,
    ...pastEvents,
  ].map((event) => ({
    ...event,
    image: event.poster_url,
    variant: event.status === "past" ? "past" : "default",
  }));

  /* --------------------------------------------------
     TAB FILTERING
  -------------------------------------------------- */

  const visibleEvents =
    activeTab === "All"
      ? allEvents
      : activeTab === "Live Events"
        ? liveEvents.map((event) => ({
            ...event,
            image: event.poster_url,
          }))
        : pastEvents.map((event) => ({
            ...event,
            image: event.poster_url,
            variant: "past",
          }));

  /* --------------------------------------------------
     HERO BUTTON STYLE
  -------------------------------------------------- */

  const heroButtonClass =
    "inline-flex items-center justify-center gap-3 rounded-lg border border-[#46536A] bg-[#151B25] px-6 py-4 text-sm font-semibold text-[#C3CDDE] transition-colors duration-300 hover:border-[#687895] hover:bg-[#202A39] hover:text-white";

  /* --------------------------------------------------
     PAGE UI
  -------------------------------------------------- */

  return (
    <main className="min-h-screen overflow-x-clip bg-[linear-gradient(135deg,#090B10_0%,#111722_48%,#090B10_100%)] text-white">
      <Navbar />

      {/* ==============================================
          FEATURED LIVE EVENTS CAROUSEL
      ============================================== */}

      <section
        id="featured-live"
        className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-white/[0.08]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* BACKGROUND VIDEO */}
        <video
          key={currentSlide?.id || "default-background"}
          className="absolute inset-0 h-full w-full object-cover"
          src={currentSlide?.video_url || "/videos/cp.mp4"}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        {/* DARKENED VIDEO LAYERS */}
        <div className="absolute inset-0 bg-[#090B10]/50" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#090B10]/95 via-[#090B10]/65 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#090B10] via-transparent to-[#090B10]/40" />

        {/* SUBTLE NAVY TONE */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#172131]/15 via-transparent to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10 md:pb-32">
          <div className="max-w-3xl">
            {loading ? (
              <div className="animate-pulse">
                <div className="mb-8 h-9 w-36 rounded-full bg-white/10" />
                <div className="h-5 w-52 rounded bg-white/10" />
                <div className="mt-7 h-20 w-3/4 rounded bg-white/10" />
              </div>
            ) : error ? (
              <>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-[#A2B0C6]">
                  IETE-SF
                </p>

                <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
                  Events
                </h1>

                <p className="mt-5 text-[#BEC3CC]">
                  Unable to retrieve the latest events.
                </p>
              </>
            ) : currentSlide ? (
              <>
                {/* LIVE BADGE */}
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-red-400/25 bg-[#171114]/75 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-red-400" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-200">
                    LIVE NOW
                  </span>
                </div>

                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-[#A2B0C6] sm:text-sm">
                  IETE-SF PRESENTS
                </p>

                <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#F4F5F7] sm:text-7xl md:text-8xl">
                  {currentSlide.title}
                </h1>

                <p className="mt-7 text-lg font-medium text-[#D4D9E1] sm:text-xl">
                  {currentSlide.category}
                </p>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#C1C6D0] sm:text-base">
                  {currentSlide.description}
                </p>

                {/* HERO ACTIONS */}
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  {currentSlide.registration_url ? (
                    <a
                      href={currentSlide.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={heroButtonClass}
                    >
                      Register Now
                      <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <a
                      href="#events"
                      className={heroButtonClass}
                    >
                      Explore Events
                      <ArrowUpRight size={18} />
                    </a>
                  )}

                  {/* RULE BOOK: SHOW ONLY WHEN AVAILABLE */}
                  {currentSlide.rule_book_url && (
                    <a
                      href={currentSlide.rule_book_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={heroButtonClass}
                    >
                      Rule Book
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* NO LIVE EVENT BADGE */}
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#53617A]/40 bg-[#151B25]/80 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#8192AF]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C0C9D8]">
                    Event Update
                  </span>
                </div>

                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-[#A2B0C6] sm:text-sm">
                  IETE-SF PRESENTS
                </p>

                <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#F4F5F7] sm:text-7xl md:text-8xl">
                  No Live Events
                  <br />
                  <span className="text-[#A2B0C6]">
                    Right Now.
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-[#C1C6D0] sm:text-base">
                  There are currently no live events happening.
                  Stay tuned for upcoming events and updates from
                  IETE-SF.
                </p>

                <a
                  href="#events"
                  className={`mt-9 ${heroButtonClass}`}
                >
                  Explore Events
                  <ArrowUpRight size={18} />
                </a>
              </>
            )}
          </div>
        </div>

        {/* ==============================================
            CAROUSEL ARROWS
        ============================================== */}

        {!loading && !error && liveEvents.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Previous live event"
              className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0A0D13]/70 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#687895] hover:bg-[#202A39] sm:left-8"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Next live event"
              className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0A0D13]/70 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#687895] hover:bg-[#202A39] sm:right-8"
            >
              <ChevronRight size={24} />
            </button>

            {/* SLIDE DOTS */}
            <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
              {liveEvents.map((event, index) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to live event ${index + 1}`}
                  aria-current={
                    activeSlide === index ? "true" : undefined
                  }
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? "w-9 bg-[#A1AEC3]"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* SCROLL INDICATOR */}
        <a
          href="#events"
          aria-label="Scroll to events"
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-[#A0A7B3] transition-colors hover:text-[#C2CCDD]"
        >
          Scroll to explore
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* ==============================================
          EVENTS SECTION
      ============================================== */}

      <section
        id="events"
        className="scroll-mt-20 px-5 py-24 sm:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Explore our events"
            title="Our Events"
            description="Discover what's happening, what's coming next, and the memories we've created together."
          />

          {/* ==========================================
              TABS
          ========================================== */}

          <div className="mb-14 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-[#292F3A] bg-[#11141A] p-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    aria-pressed={isActive}
                    className={`rounded-lg border px-5 py-3 text-xs font-semibold transition-colors duration-300 sm:px-8 sm:text-sm ${
                      isActive
                        ? "border-[#52617B]/50 bg-[#202A39] text-[#DCE3EE]"
                        : "border-transparent text-[#9299A5] hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==========================================
              EVENT CARDS
          ========================================== */}

          <div key={activeTab}>
            {loading ? (
              <EmptyState
                icon={CalendarDays}
                title="Loading events"
                description="Please wait while we retrieve the latest events."
              />
            ) : error ? (
              <EmptyState
                icon={CalendarDays}
                title="Unable to load events"
                description={error}
              />
            ) : visibleEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    variant={event.variant || "default"}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={
                  activeTab === "Live Events" ? Radio : CalendarDays
                }
                title={
                  activeTab === "Live Events"
                    ? "No live events right now"
                    : "Something exciting is on its way"
                }
                description={
                  activeTab === "Live Events"
                    ? "Live events will appear here when announced."
                    : "Events will appear here as soon as they are published."
                }
              />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}