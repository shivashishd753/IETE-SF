"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";
import "./login.css";

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
        setStatus(data.message || "Those details didn’t match. Please try again.");
        return;
      }

      router.push("/dashboard");
    } catch {
      setStatus("Could not connect. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="member-entry">
      <header className="entry-header">
        <Link href="/" className="entry-brand" aria-label="IETE-SF home">
          <Image src="/logo.svg" alt="" width={33} height={33} priority />
          <span>IETE-SF</span>
        </Link>
        <span className="entry-location">BIT SINDRI</span>
      </header>

      <section className="entry-content" aria-labelledby="entry-title">
        <p className="entry-eyebrow">MEMBER PORTAL</p>
        <h1 id="entry-title">Welcome back.</h1>
        <p className="entry-intro">Sign in to continue to your IETE-SF account.</p>

        <form onSubmit={handleSubmit} className="member-form">
          <div className="entry-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="entry-field">
            <div className="entry-password-label">
              <label htmlFor="password">Password</label>
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
            <div className="entry-password-input">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="entry-reveal"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {status && <p className="entry-status" role="alert">{status}</p>}
          <button className="entry-submit" type="submit" disabled={submitting}>
            <span>{submitting ? "Signing in…" : "Sign in"}</span>
            {!submitting && <ArrowUpRight size={17} strokeWidth={1.8} />}
          </button>
        </form>

        <p className="entry-help">Access is for authorized IETE-SF members. Need help? Contact the club team.</p>
      </section>

      <footer className="entry-footer">
        <Link href="/">← Back to IETE-SF</Link>
        <span>© 2026 IETE-SF · BIT Sindri</span>
      </footer>
    </main>
  );
}


