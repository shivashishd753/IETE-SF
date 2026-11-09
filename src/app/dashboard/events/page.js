
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Search,
  Plus,
  Pencil,
  Trash2,
  Star,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

const filters = ["all", "upcoming", "live", "past"];

export default function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/events", {
        cache: "no-store",
        credentials: "same-origin",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not load events.");
      }

      setEvents(data.events || []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesFilter =
        filter === "all" || event.status === filter;

      const matchesSearch =
        event.title?.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [events, filter, search]);

  async function updateEvent(id, changes) {
    setActionId(id);
    setError("");

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(changes),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not update event.");
      }

      await fetchEvents();
    } catch (err) {
      setError(err.message || "Update failed.");
    } finally {
      setActionId(null);
    }
  }

  async function deleteEvent(event) {
    const confirmed = window.confirm(
      `Delete "${event.title}" permanently?`
    );

    if (!confirmed) return;

    setActionId(event.id);
    setError("");

    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not delete event.");
      }

      setEvents((current) =>
        current.filter((item) => item.id !== event.id)
      );
    } catch (err) {
      setError(err.message || "Delete failed.");
    } finally {
      setActionId(null);
    }
  }

  function formatDate(date) {
    if (!date) return "Date not set";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function statusStyle(status) {
    const styles = {
      upcoming: "bg-blue-400/10 text-blue-300",
      live: "bg-emerald-400/10 text-emerald-300",
      past: "bg-slate-400/10 text-slate-400",
    };

    return styles[status] || styles.past;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080B14] px-5 py-8 text-white sm:px-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[130px]" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/[0.07] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/dashboard"
              className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
            >
              <ArrowLeft size={16} />
              Dashboard
            </Link>

            <h1 className="text-2xl font-semibold">Manage Events</h1>
            <p className="mt-2 text-sm text-slate-500">
              View and manage all IETE-SF events.
            </p>
          </div>

          <Link
            href="/dashboard/events/new"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
          >
            <Plus size={17} />
            Add Event
          </Link>
        </header>

        <section className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Total", events.length],
            ["Upcoming", events.filter((e) => e.status === "upcoming").length],
            ["Live", events.filter((e) => e.status === "live").length],
            ["Past", events.filter((e) => e.status === "past").length],
          ].map(([label, count]) => (
            <div
              key={label}
              className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-4 backdrop-blur-xl"
            >
              <p className="text-sm text-slate-400">{label} Events</p>
              <p className="mt-3 text-2xl font-semibold">{count}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-3 py-2 text-sm capitalize transition ${
                    filter === item
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {item === "all" ? "All Events" : item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3">
              <Search size={16} className="text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
                className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-600 sm:w-52"
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-lg border border-red-400/20 bg-red-400/[0.06] p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-20 text-sm text-slate-400">
              <RefreshCw size={16} className="animate-spin" />
              Loading events...
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="py-20 text-center">
              <CalendarDays
                size={30}
                className="mx-auto mb-4 text-slate-600"
              />
              <p className="text-sm text-slate-300">No events found.</p>
              <p className="mt-2 text-xs text-slate-500">
                Add an event or change your search/filter.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-black/20 p-4 sm:flex-row sm:items-center"
                >
                  <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg bg-white/[0.04] sm:w-28">
                    {event.poster_url ? (
                      <img
                        src={event.poster_url}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-600">
                        No poster
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-medium">{event.title}</h2>

                      {event.is_featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-1 text-[10px] text-amber-300">
                          <Star size={11} fill="currentColor" />
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{formatDate(event.starts_at)}</span>
                      <span>·</span>
                      <span>{event.category || "Uncategorised"}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] capitalize ${statusStyle(event.status)}`}
                      >
                        {event.status}
                      </span>

                      <span className={`rounded-full px-2.5 py-1 text-[11px] ${
                        event.is_published
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-slate-400/10 text-slate-400"
                      }`}>
                        {event.is_published ? "Published" : "Hidden"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Link
                      href={`/dashboard/events/${event.id}/edit`}
                      title="Edit event"
                      className="rounded-lg border border-white/10 p-2.5 text-slate-400 transition hover:border-cyan-300/30 hover:text-cyan-300"
                    >
                      <Pencil size={16} />
                    </Link>

                    <button
                      disabled={actionId === event.id}
                      onClick={() =>
                        updateEvent(event.id, {
                          is_published: !event.is_published,
                        })
                      }
                      title={event.is_published ? "Hide event" : "Publish event"}
                      className="rounded-lg border border-white/10 p-2.5 text-slate-400 transition hover:text-cyan-300 disabled:opacity-40"
                    >
                      {event.is_published ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                    <button
                      disabled={actionId === event.id || event.status !== "live"}
                      onClick={() =>
                        updateEvent(event.id, {
                          is_featured: !event.is_featured,
                        })
                      }
                      title={
                        event.status !== "live"
                          ? "Only live events can be featured"
                          : event.is_featured
                            ? "Remove featured status"
                            : "Feature event"
                      }
                      className="rounded-lg border border-white/10 p-2.5 text-slate-400 transition hover:text-amber-300 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Star
                        size={16}
                        fill={event.is_featured ? "currentColor" : "none"}
                        className={event.is_featured ? "text-amber-300" : ""}
                      />
                    </button>

                    <button
                      disabled={actionId === event.id}
                      onClick={() => deleteEvent(event)}
                      title="Delete event"
                      className="rounded-lg border border-white/10 p-2.5 text-slate-400 transition hover:border-red-400/30 hover:text-red-300 disabled:opacity-40"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
