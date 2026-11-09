
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(
          data.message || "Those details didn’t match. Please try again."
        );
        return;
      }

      router.push("/dashboard");
    } catch {
      setStatus(
        "Could not connect. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#070B18] text-white">
      {/* Background lighting */}
      <div className="pointer-events-none absolute -left-48 top-1/4 h-[420px] w-[420px] rounded-full bg-blue-600/[0.07] blur-[140px]" />
      <div className="pointer-events-none absolute -right-48 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/[0.06] blur-[150px]" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-10 sm:py-7 lg:px-16">
        <Link
          href="/"
          aria-label="IETE-SF home"
          className="flex items-center gap-3"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 sm:h-14 sm:w-14">
            <Image
              src="/logo.svg"
              alt="IETE-SF logo"
              width={48}
              height={48}
              priority
              className="h-full w-full object-contain"
            />
          </span>

          <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            IETE-SF
          </span>
        </Link>

        <span className="text-[11px] font-medium tracking-[0.25em] text-slate-400 sm:text-xs">
          BIT SINDRI
        </span>
      </header>

      {/* Main login section */}
      <section className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="mx-auto w-full max-w-[460px]">

          {/* Logo and heading */}
          <div className="mb-8 flex flex-col items-center text-center sm:mb-9">
           <div className="mb-6 flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-400/20 bg-white p-1.5 shadow-[0_0_25px_rgba(34,211,238,0.08)] sm:h-20 sm:w-20">
  <Image
    src="/logo.svg"
    alt="IETE-SF logo"
    width={85}
    height={85}
    priority
    className="h-full w-full rounded-full object-contain"
  />
</div>

            <p className="mb-3 text-xs font-bold tracking-[0.32em] text-cyan-400 sm:text-sm">
              MEMBER PORTAL
            </p>

            <h1 className="text-[36px] font-bold leading-tight tracking-tight text-white sm:text-[42px]">
              Welcome back.
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-400 sm:text-lg">
              Sign in to continue to your IETE-SF account.
            </p>
          </div>

          {/* Login card */}
          <div className="w-full rounded-2xl border border-white/[0.09] bg-[#0D1323]/90 p-6 shadow-2xl shadow-black/30 sm:p-9">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-base font-medium text-slate-200"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="h-14 w-full rounded-xl border border-white/10 bg-[#080D19] px-4 text-base text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-slate-200"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="h-14 w-full rounded-xl border border-white/10 bg-[#080D19] px-4 pr-12 text-base text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-cyan-400"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {status && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3 text-sm leading-6 text-red-300"
                >
                  {status}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-cyan-400 px-5 text-base font-semibold text-[#06101B] transition duration-200 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{submitting ? "Signing in..." : "Sign in"}</span>

                {!submitting && (
                  <ArrowUpRight
                    size={19}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                )}
              </button>
            </form>

            <div className="mt-7 border-t border-white/[0.08] pt-6">
              <p className="text-center text-sm leading-6 text-slate-400">
                Access is for authorized IETE-SF members. Need help? Contact
                the club team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center justify-between gap-3 px-5 py-6 text-sm text-slate-400 sm:flex-row sm:px-10 lg:px-16">
        <Link href="/" className="transition hover:text-cyan-400">
          ← Back to IETE-SF
        </Link>

        <span>© 2026 IETE-SF · BIT Sindri</span>
      </footer>
    </main>
  );
}
