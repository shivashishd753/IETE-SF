
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  category: "",
  starts_at: "",
  ends_at: "",
  location: "",
  registration_url: "",
  poster_url: "",
  video_url: "",
  is_published: false,
  is_featured: false,
  sort_order: 0,
};

const inputClass =
  "mt-2 w-full rounded-lg border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50";

const labelClass = "text-sm font-medium text-slate-300";

function toLocalDateTime(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const pad = (number) => String(number).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function EditEventForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isCurrentlyLive =
    form.starts_at &&
    form.ends_at &&
    new Date() >= new Date(form.starts_at) &&
    new Date() < new Date(form.ends_at);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function fetchEvent() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/events/${id}`, {
          cache: "no-store",
          credentials: "same-origin",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load event.");
        }

        if (cancelled) return;

        const event = data.event;

        setForm({
          title: event.title ?? "",
          description: event.description ?? "",
          category: event.category ?? "",
          starts_at: toLocalDateTime(event.starts_at),
          ends_at: toLocalDateTime(event.ends_at),
          location: event.location ?? "",
          registration_url: event.registration_url ?? "",
          poster_url: event.poster_url ?? "",
          video_url: event.video_url ?? "",
          is_published: Boolean(event.is_published),
          is_featured: Boolean(event.is_featured),
          sort_order: Number(event.sort_order ?? 0),
        });
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchEvent();

    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : name === "sort_order"
            ? Number(value)
            : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    if (!form.starts_at || !form.ends_at) {
      setError("Both start and end dates are required.");
      setSaving(false);
      return;
    }

    const startDate = new Date(form.starts_at);
    const endDate = new Date(form.ends_at);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      setError("Please enter valid event dates.");
      setSaving(false);
      return;
    }

    if (endDate <= startDate) {
      setError("End date and time must be after start date and time.");
      setSaving(false);
      return;
    }

    const currentlyLive =
      new Date() >= startDate && new Date() < endDate;

    if (form.is_featured && !currentlyLive) {
      setError("Only currently live events can be featured.");
      setSaving(false);
      return;
    }

    try {
      const payload = {
        ...form,
        starts_at: startDate.toISOString(),
        ends_at: endDate.toISOString(),
        is_featured: currentlyLive ? form.is_featured : false,
      };

      const response = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update event.");
      }

      setSuccess("Event updated successfully.");

      setTimeout(() => {
        router.push("/dashboard/events");
        router.refresh();
      }, 700);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center gap-3 bg-[#080B14] text-sm text-slate-400">
        <RefreshCw size={17} className="animate-spin" />
        Loading event details...
      </main>
    );
  }

  if (error && !form.title) {
    return (
      <main className="min-h-screen bg-[#080B14] px-5 py-10 text-white sm:px-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard/events"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300"
          >
            <ArrowLeft size={16} />
            Back to events
          </Link>

          <div className="mt-8 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-5 text-sm text-red-300">
            {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080B14] px-5 py-8 text-white sm:px-10">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[130px]" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/[0.07] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <Link
          href="/dashboard/events"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
        >
          <ArrowLeft size={16} />
          Back to events
        </Link>

        <div className="mb-8 mt-6">
          <h1 className="text-2xl font-semibold">Edit Event</h1>
          <p className="mt-2 text-sm text-slate-500">
            Update the details of your IETE-SF event.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-8"
        >
          {/* Basic Information */}
          <section>
            <h2 className="mb-5 text-sm font-semibold text-white">
              Basic Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Event Title *</label>
                <input
                  required
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  maxLength={200}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your event..."
                  rows={4}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Technical, Cultural, Workshop..."
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="border-t border-white/[0.08]" />

          {/* Date and Location */}
          <section>
            <h2 className="mb-5 text-sm font-semibold text-white">
              Date and Location
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Start Date & Time *</label>
                <input
                  required
                  type="datetime-local"
                  name="starts_at"
                  value={form.starts_at}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>End Date & Time *</label>
                <input
                  required
                  type="datetime-local"
                  name="ends_at"
                  value={form.ends_at}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Event venue"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Registration URL</label>
                <input
                  type="url"
                  name="registration_url"
                  value={form.registration_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-cyan-300/70">
              Event status is calculated automatically: Upcoming before
              the start time, Live during the event, and Past after it ends.
            </p>
          </section>

          <div className="border-t border-white/[0.08]" />

          {/* Event Media */}
          <section>
            <h2 className="mb-5 text-sm font-semibold text-white">
              Event Media
            </h2>

            <p className="mb-4 text-xs leading-5 text-slate-500">
              Update the existing poster and video URLs.
            </p>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Poster Image URL</label>
                <input
                  type="url"
                  name="poster_url"
                  value={form.poster_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>

              {form.poster_url && (
                <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20 p-2">
                  <p className="mb-2 text-xs text-slate-500">
                    Poster preview
                  </p>
                  <img
                    src={form.poster_url}
                    alt="Event poster preview"
                    className="max-h-64 rounded-md object-contain"
                  />
                </div>
              )}

              <div>
                <label className={labelClass}>Video URL</label>
                <input
  type="text"
  name="video_url"
  value={form.video_url}
  onChange={handleChange}
  placeholder="/videos/event-name.mp4 or https://..."
  className={inputClass}
/>
              </div>
            </div>
          </section>

          <div className="border-t border-white/[0.08]" />

          {/* Publishing Settings */}
          <section>
            <h2 className="mb-5 text-sm font-semibold text-white">
              Publishing Settings
            </h2>

            <div className="space-y-4">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={form.is_published}
                  onChange={handleChange}
                  className="h-4 w-4 accent-cyan-400"
                />
                Publish this event on the website
              </label>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleChange}
                  disabled={!isCurrentlyLive}
                  className="h-4 w-4 accent-cyan-400 disabled:cursor-not-allowed"
                />
                Feature this event in the homepage hero
              </label>

              <div className="max-w-xs">
                <label className={labelClass}>Display Order</label>
                <input
                  type="number"
                  name="sort_order"
                  value={form.sort_order}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Error and Success Messages */}
          {error && (
            <div className="rounded-lg border border-red-400/20 bg-red-400/[0.06] p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] p-3 text-sm text-emerald-300">
              {success}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-wrap justify-end gap-3 border-t border-white/[0.08] pt-6">
            <Link
              href="/dashboard/events"
              className="rounded-lg border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function EditEventPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center gap-3 bg-[#080B14] text-sm text-slate-400">
          <RefreshCw size={17} className="animate-spin" />
          Loading edit page...
        </main>
      }
    >
      <EditEventForm />
    </Suspense>
  );
}
