
"use client";

import { useState } from "react";
import { KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 12) {
      setMessage("Your new password must be at least 12 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
        return;
      }

      setSuccess(true);
      setMessage(data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMessage("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/[0.09] bg-[#080B14]/70 px-4 py-3 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      {[
        {
          label: "Current Password",
          value: currentPassword,
          setter: setCurrentPassword,
          placeholder: "Enter current password",
        },
        {
          label: "New Password",
          value: newPassword,
          setter: setNewPassword,
          placeholder: "Minimum 12 characters",
        },
        {
          label: "Confirm New Password",
          value: confirmPassword,
          setter: setConfirmPassword,
          placeholder: "Re-enter new password",
        },
      ].map((field) => (
        <div key={field.label}>
          <label className="text-xs font-medium text-slate-400">
            {field.label}
          </label>

          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              placeholder={field.placeholder}
              required
              autoComplete="new-password"
              maxLength={72}
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-cyan-300"
              aria-label={showPasswords ? "Hide passwords" : "Show passwords"}
            >
              {showPasswords ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>
      ))}

      {message && (
        <p
          role="status"
          className={`text-sm ${
            success ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/20 bg-cyan-400/[0.10] px-5 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/[0.17] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <KeyRound size={16} />
            Update Password
          </>
        )}
      </button>
    </form>
  );
}
