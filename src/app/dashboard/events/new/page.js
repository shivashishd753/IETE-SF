
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Save } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  category: "",
  status: "upcoming",
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

export default function AddEventPage() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    if (
      form.starts_at &&
      form.ends_at &&
      new Date(form.ends_at) < new Date(form.starts_at)
    ) {
      setError("End date cannot be earlier than start date.");
      setSaving(false);
      return;
    }

    if (form.is_featured && form.status !== "live") {
      setError("Only live events can be featured.");
      setSaving(false);
      return;
    }

    try {
      const payload = {
        ...form,
        starts_at: form.starts_at
          ? new Date(form.starts_at).toISOString()
          : null,
        ends_at: form.ends_at
          ? new Date(form.ends_at).toISOString()
          : null,
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to create event.");
      }

      setSuccess("Event created successfully.");

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
          <h1 className="text-2xl font-semibold">Add New Event</h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter the details of your IETE-SF event.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl sm:p-8"
        >
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

              <div className="grid gap-5 sm:grid-cols-2">
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

                <div>
                  <label className={labelClass}>Event Status *</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-white/[0.08]" />

          <section>
            <h2 className="mb-5 text-sm font-semibold text-white">
              Date and Location
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="starts_at"
                  value={form.starts_at}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>End Date & Time</label>
                <input
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
          </section>

          <div className="border-t border-white/[0.08]" />

          <section>
            <h2 className="mb-5 text-sm font-semibold text-white">
              Event Media
            </h2>

            <p className="mb-4 text-xs leading-5 text-slate-500">
              For now, provide existing media URLs. We'll add direct poster
              and video uploads with media storage separately.
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

              <div>
                <label className={labelClass}>Video URL</label>
                <input
                  type="url"
                  name="video_url"
                  value={form.video_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="border-t border-white/[0.08]" />

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
                  disabled={form.status !== "live"}
                  className="h-4 w-4 accent-cyan-400"
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
              {saving ? "Saving..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
