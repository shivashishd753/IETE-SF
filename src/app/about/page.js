"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  HomeIcon,
  Info,
  UsersRound,
  GraduationCap,
  CalendarDays,
  Layers3,
  Mail,
  LogIn,
  Rocket,
  Trophy,
  BookOpen,
  FileCheck,
  ChevronDown,
  MapPin,
  Globe,
  Users,
  Award,
} from "lucide-react";

/* ────────────────────────────────────────────
   Intersection-observer hook for scroll reveals
   ──────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ────────────────────────────────────────────
   Stagger-children wrapper
   ──────────────────────────────────────────── */
function RevealGroup({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   Animated counter for stats
   ──────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ════════════════════════════════════════════
   ABOUT PAGE
   ════════════════════════════════════════════ */
export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flyingSocial, setFlyingSocial] = useState(null);
  const [footerEmail, setFooterEmail] = useState("");

  /* ── Objectives data ── */
  const objectives = [
    {
      Icon: Rocket,
      title: "Advancement of Technology",
      desc: "Promoting the advancement of Electronics, Telecommunications, and Information Technology sciences.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      Icon: Trophy,
      title: "Leadership & Development",
      desc: "Fostering professional excellence and contributing to national development through technological leadership.",
      gradient: "from-violet-500 to-indigo-600",
    },
    {
      Icon: BookOpen,
      title: "Knowledge Dissemination",
      desc: "Organizing conferences, publishing journals, and facilitating continuing education programs.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      Icon: FileCheck,
      title: "Professional Examinations",
      desc: "Conducting AMIETE and DIPIETE examinations to certify professional competence in the field.",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  /* ── Stats ── */
  const stats = [
    { value: 70, suffix: "+", label: "Years of Legacy" },
    { value: 125000, suffix: "+", label: "Members" },
    { value: 64, suffix: "", label: "Centres in India & Abroad" },
  ];

  /* ── Faculty ── */
  const faculty = [
    {
      name: "Prof. (Dr.) Pankaj Rai",
      role: "Our Patron",
      desc: "Guiding the institution with wisdom and vision towards excellence in technical education.",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      name: "Prof. Imteyaz Ahmed",
      role: "Professor In-Charge",
      desc: "Leading day-to-day operations and ensuring the highest standards of academic excellence.",
      gradient: "from-violet-400 to-indigo-500",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#070B18] text-white">
      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed left-1/2 top-3 z-50 mt-3 flex min-h-[88px] w-[calc(100%-32px)] max-w-[1450px] -translate-x-1/2 items-center justify-between rounded-[24px] border border-white/[0.13] bg-[#080B12]/45 px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="IETE-SF Home"
          className="relative z-10 flex shrink-0 items-center"
        >
          <img
            src="/logo.svg"
            alt="IETE-SF"
            className="h-[60px] w-[60px] object-contain"
          />
        </Link>

        {/* Centered desktop navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:flex 2xl:gap-7">
          {[
            { label: "Home", href: "/", Icon: HomeIcon },
            { label: "About", href: "/about", Icon: Info },
            { label: "Members", href: "/members", Icon: UsersRound },
            { label: "Alumni", href: "/alumni", Icon: GraduationCap },
            { label: "Events", href: "/events", Icon: CalendarDays },
            { label: "Domains", href: "/domains", Icon: Layers3 },
            { label: "Contact", href: "/contact", Icon: Mail },
          ].map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              className={`group relative flex items-center gap-2.5 whitespace-nowrap py-3 text-[15px] font-medium tracking-wide transition-colors duration-300 ${
                label === "About"
                  ? "text-cyan-300"
                  : "text-slate-200/90 hover:text-cyan-300"
              }`}
            >
              <Icon
                size={19}
                strokeWidth={1.8}
                className={`transition-transform duration-300 group-hover:-translate-y-0.5 ${
                  label === "About"
                    ? "text-cyan-300"
                    : "group-hover:text-cyan-300"
                }`}
              />
              <span>{label}</span>
              <span
                className={`absolute bottom-0 left-0 h-px bg-cyan-300 transition-all duration-300 ${
                  label === "About"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Login */}
        <Link
          href="/login"
          className="relative z-10 hidden shrink-0 items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/[0.07] hover:text-cyan-200 sm:flex"
        >
          <LogIn size={18} strokeWidth={1.8} />
          Login
        </Link>

        {/* Mobile menu toggle */}
        <div className="relative z-10 ml-auto flex items-center gap-3 xl:hidden">
          <Link
            href="/login"
            aria-label="Member Login"
            className="rounded-xl border border-white/15 p-3 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-300 sm:hidden"
          >
            <LogIn size={20} />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-lg text-white transition hover:border-cyan-300/40 hover:text-cyan-300"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-2xl border border-white/10 bg-[#080B12]/95 p-3 shadow-2xl backdrop-blur-2xl xl:hidden">
            {[
              { label: "Home", href: "/", Icon: HomeIcon },
              { label: "About", href: "/about", Icon: Info },
              { label: "Members", href: "/members", Icon: UsersRound },
              { label: "Alumni", href: "/alumni", Icon: GraduationCap },
              { label: "Events", href: "/events", Icon: CalendarDays },
              { label: "Domains", href: "/domains", Icon: Layers3 },
              { label: "Contact", href: "/contact", Icon: Mail },
            ].map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition ${
                  label === "About"
                    ? "bg-cyan-300/[0.07] text-cyan-200"
                    : "text-slate-200 hover:bg-cyan-300/[0.07] hover:text-cyan-200"
                }`}
              >
                <Icon size={19} strokeWidth={1.8} />
                {label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-xl border border-cyan-300/20 px-4 py-3.5 text-sm text-cyan-100"
            >
              <LogIn size={19} />
              Member Login
            </Link>
          </div>
        )}
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-20 pt-36">
        {/* Background layers */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 43%, rgba(15, 91, 220, 0.20) 0%, rgba(12, 39, 91, 0.13) 30%, transparent 62%),
              radial-gradient(ellipse at 50% 100%, rgba(13, 53, 115, 0.14) 0%, transparent 55%),
              linear-gradient(135deg, #0b1020 0%, #070b17 48%, #03050b 100%)
            `,
          }}
        />

        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(82, 137, 220, 0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(82, 137, 220, 0.035) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 78%)",
          }}
        />

        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-[43%] -z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.08] blur-[100px] sm:h-[480px] sm:w-[480px]" />

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
          <RevealGroup delay={0}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              <Info size={14} />
              About Us
            </div>
          </RevealGroup>

          <RevealGroup delay={100}>
            <h1 className="mt-4 text-4xl font-black uppercase leading-tight tracking-[0.04em] sm:text-6xl md:text-7xl">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                About{" "}
              </span>
              <span className="bg-gradient-to-b from-cyan-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                IETE
              </span>
            </h1>
          </RevealGroup>

          <RevealGroup delay={200}>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent sm:w-36" />
          </RevealGroup>

          <RevealGroup delay={300}>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed">
              The Institution of Electronics and Telecommunication Engineers
              (IETE) is India&apos;s leading recognised professional society
              devoted to the advancement of science and technology of
              Electronics, Telecommunication &amp; IT.{" "}
              <span className="font-semibold text-cyan-300">
                Founded in 1953.
              </span>
            </p>
          </RevealGroup>

          <RevealGroup delay={400}>
            <a
              href="#national-body"
              className="mt-14 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-slate-500 transition-colors hover:text-blue-300"
            >
              <span className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-600 p-1.5">
                <span className="h-2 w-1 animate-bounce rounded-full bg-blue-300" />
              </span>
              Explore
            </a>
          </RevealGroup>
        </div>
      </section>

      {/* ═══ NATIONAL BODY SECTION ═══ */}
      <section
        id="national-body"
        className="relative overflow-hidden px-5 py-24 sm:py-32"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <RevealGroup>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/70">
              Our Parent Body
            </p>
          </RevealGroup>

          <RevealGroup delay={100}>
            <h2 className="mt-4 text-center text-3xl font-black uppercase tracking-wide sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                IETE National Body
              </span>
            </h2>
          </RevealGroup>

          <RevealGroup delay={150}>
            <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent sm:w-28" />
          </RevealGroup>

          <RevealGroup delay={200}>
            <p className="mx-auto mt-8 max-w-4xl text-center text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-relaxed">
              The Institution of Electronics and Telecommunication Engineers
              (IETE) stands as the{" "}
              <span className="font-semibold text-white">
                National Apex Professional Body
              </span>{" "}
              for electronics, telecommunication, and information technology
              professionals in India. With a prestigious legacy spanning{" "}
              <span className="font-semibold text-cyan-300">
                seven decades
              </span>
              , IETE has grown to encompass a thriving community driving
              technological advancement and professional excellence.
            </p>
          </RevealGroup>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <RevealGroup key={stat.label} delay={300 + i * 100}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center transition-all duration-500 hover:border-cyan-300/20 hover:bg-white/[0.04]">
                  {/* Hover glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                  </div>
                  <p className="text-4xl font-black text-cyan-300 sm:text-5xl">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OBJECTIVES SECTION ═══ */}
      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(82, 137, 220, 0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(82, 137, 220, 0.025) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <RevealGroup>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-blue-400/70">
              Our Mission
            </p>
          </RevealGroup>

          <RevealGroup delay={100}>
            <h2 className="mt-4 text-center text-3xl font-black uppercase tracking-wide sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Objective of IETE
              </span>
            </h2>
          </RevealGroup>

          <RevealGroup delay={150}>
            <p className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-500">
              Driving excellence in electronics and telecommunications
            </p>
          </RevealGroup>

          <RevealGroup delay={200}>
            <div className="mx-auto mt-2 h-px w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent sm:w-28" />
          </RevealGroup>

          {/* Objectives grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {objectives.map((obj, i) => (
              <RevealGroup key={obj.title} delay={300 + i * 120}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent p-8 transition-all duration-500 hover:border-white/[0.15] hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                  {/* Top border glow on hover */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${obj.gradient} shadow-lg`}
                  >
                    <obj.Icon size={24} className="text-white" strokeWidth={2} />
                  </div>

                  <h3 className="text-lg font-bold tracking-wide text-white sm:text-xl">
                    {obj.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {obj.desc}
                  </p>
                </div>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FACULTY / LEADERS SECTION ═══ */}
      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/[0.04] blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <RevealGroup>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-violet-400/70">
              Meet Our Leaders
            </p>
          </RevealGroup>

          <RevealGroup delay={100}>
            <h2 className="mt-4 text-center text-3xl font-black uppercase tracking-wide sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Our Support
              </span>
            </h2>
          </RevealGroup>

          <RevealGroup delay={150}>
            <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-violet-400 to-transparent sm:w-28" />
          </RevealGroup>

          {/* Faculty cards */}
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {faculty.map((person, i) => (
              <RevealGroup key={person.name} delay={250 + i * 150}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center transition-all duration-500 hover:border-white/[0.15]">
                  {/* Top gradient line */}
                  <div
                    className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${person.gradient} opacity-60 transition-opacity group-hover:opacity-100`}
                  />

                  {/* Avatar placeholder */}
                  <div
                    className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${person.gradient} shadow-lg shadow-cyan-500/10`}
                  >
                    <Users size={36} className="text-white/90" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
                    {person.role}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                    {person.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {person.desc}
                  </p>
                </div>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NATIONWIDE PRESENCE SECTION ═══ */}
      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/[0.05] blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <RevealGroup>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/70">
              Nationwide Presence
            </p>
          </RevealGroup>

          <RevealGroup delay={100}>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-wide sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                IETE is All Around India
              </span>
            </h2>
          </RevealGroup>

          <RevealGroup delay={150}>
            <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent sm:w-28" />
          </RevealGroup>

          <RevealGroup delay={250}>
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  Icon: Globe,
                  value: "64+",
                  label: "Centres Across India & Abroad",
                },
                {
                  Icon: Users,
                  value: "1,25,000+",
                  label: "Members Nationwide",
                },
                {
                  Icon: Award,
                  value: "70+",
                  label: "Years of Excellence",
                },
              ].map((item, i) => (
                <RevealGroup key={item.label} delay={350 + i * 100}>
                  <div className="group flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:border-cyan-300/20 hover:bg-white/[0.04]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] transition-colors duration-300 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/[0.12]">
                      <item.Icon
                        size={26}
                        className="text-cyan-300"
                        strokeWidth={1.8}
                      />
                    </div>
                    <p className="text-3xl font-black text-white">
                      {item.value}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                      {item.label}
                    </p>
                  </div>
                </RevealGroup>
              ))}
            </div>
          </RevealGroup>

          {/* India map illustration — styled SVG outline */}
          <RevealGroup delay={500}>
            <div className="relative mx-auto mt-16 max-w-2xl">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-10 sm:p-14">
                {/* Decorative map dots */}
                <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
                  {/* Stylized India outline using positioned dots */}
                  {[
                    { top: "8%", left: "35%" },
                    { top: "8%", left: "50%" },
                    { top: "8%", left: "65%" },
                    { top: "15%", left: "25%" },
                    { top: "15%", left: "40%" },
                    { top: "15%", left: "55%" },
                    { top: "15%", left: "70%" },
                    { top: "22%", left: "20%" },
                    { top: "22%", left: "35%" },
                    { top: "22%", left: "50%" },
                    { top: "22%", left: "65%" },
                    { top: "22%", left: "80%" },
                    { top: "30%", left: "18%" },
                    { top: "30%", left: "33%" },
                    { top: "30%", left: "48%" },
                    { top: "30%", left: "63%" },
                    { top: "30%", left: "78%" },
                    { top: "38%", left: "15%" },
                    { top: "38%", left: "30%" },
                    { top: "38%", left: "45%" },
                    { top: "38%", left: "60%" },
                    { top: "38%", left: "75%" },
                    { top: "38%", left: "85%" },
                    { top: "46%", left: "18%" },
                    { top: "46%", left: "33%" },
                    { top: "46%", left: "48%" },
                    { top: "46%", left: "63%" },
                    { top: "46%", left: "78%" },
                    { top: "54%", left: "20%" },
                    { top: "54%", left: "35%" },
                    { top: "54%", left: "50%" },
                    { top: "54%", left: "65%" },
                    { top: "54%", left: "75%" },
                    { top: "62%", left: "25%" },
                    { top: "62%", left: "40%" },
                    { top: "62%", left: "55%" },
                    { top: "62%", left: "68%" },
                    { top: "70%", left: "30%" },
                    { top: "70%", left: "45%" },
                    { top: "70%", left: "58%" },
                    { top: "78%", left: "35%" },
                    { top: "78%", left: "48%" },
                    { top: "85%", left: "42%" },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-cyan-400/30 transition-all duration-700 hover:scale-150 hover:bg-cyan-300"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        animationDelay: `${i * 50}ms`,
                      }}
                    />
                  ))}

                  {/* BIT Sindri highlight */}
                  <div
                    className="absolute flex items-center gap-2"
                    style={{ top: "35%", left: "62%" }}
                  >
                    <div className="relative">
                      <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                      <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/40" />
                    </div>
                    <span className="whitespace-nowrap rounded-md bg-[#080B12]/80 px-2 py-1 text-[10px] font-bold tracking-wider text-cyan-300 backdrop-blur-sm">
                      BIT SINDRI
                    </span>
                  </div>
                </div>

                {/* Map label */}
                <div className="mt-6 flex items-center justify-center gap-3 text-slate-500">
                  <MapPin size={16} className="text-cyan-400" />
                  <span className="text-xs font-medium uppercase tracking-[0.3em]">
                    BIT Sindri, Dhanbad, Jharkhand — 828123
                  </span>
                </div>
              </div>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="iete-footer">
        <div className="iete-footer-glow" />

        <div className="relative z-10 mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-12">
          {/* Brand and social links */}
          <div className="iete-footer-top">
            <Link
              href="/"
              className="iete-footer-brand"
              aria-label="IETE-SF Home"
            >
              <img src="/logo.svg" alt="IETE-SF logo" />
              <span>
                IETE<span className="iete-brand-dot"></span>
              </span>
            </Link>

            <div className="iete-socials">
              {[
                {
                  name: "Facebook",
                  href: "https://www.facebook.com/ietebits",
                  color: "#1877F2",
                  icon: (
                    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V13h2.8v8z" />
                  ),
                },
                {
                  name: "X",
                  href: "https://x.com/IETE_BITS",
                  color: "#E5E7EB",
                  icon: (
                    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.3L5.7 22H2.5l7.3-8.4L2 2h6.5l4.4 6.7zM17.8 20h1.7L7.4 3.9H5.6z" />
                  ),
                },
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/ietebits/",
                  color: "#E879F9",
                  icon: (
                    <>
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="17.6" cy="6.7" r="1.2" />
                    </>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/search/results/all/?keywords=IETE%20Students%27%20Forum%20BIT%20Sindri&origin=RICH_QUERY_SUGGESTION&heroEntityKey=urn%3Ali%3Aorganization%3A42721036&position=0",
                  color: "#0A66C2",
                  icon: (
                    <path d="M5 8.5H2V22h3zM3.5 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6M22 13.8c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V8.5H10V22h3v-7.1c0-1.9.4-3.7 2.7-3.7s2.3 2.1 2.3 3.8V22h3z" />
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={`Visit IETE-SF on ${social.name}`}
                  className={`iete-social-link ${
                    flyingSocial === social.name ? "iete-social-fly" : ""
                  }`}
                  style={{ "--social-color": social.color }}
                  onClick={(event) => {
                    event.preventDefault();
                    if (
                      window.matchMedia("(prefers-reduced-motion: reduce)")
                        .matches
                    ) {
                      window.location.href = social.href;
                      return;
                    }
                    setFlyingSocial(social.name);
                    window.setTimeout(() => {
                      window.location.href = social.href;
                    }, 650);
                  }}
                >
                  <span className="iete-social-trail" />
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}

              <a
                href="https://iete-induction-26.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="iete-join-footer"
              >
                Join Us <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Footer information */}
          <div className="iete-footer-grid">
            <div className="iete-footer-column">
              <h3>IETE</h3>
              <nav className="iete-footer-links" aria-label="Footer navigation">
                <Link href="/">Home</Link>
                <Link href="/contact">Contact us</Link>
                <Link href="/about">About us</Link>
                <Link href="/events">Events</Link>
              </nav>
            </div>

            <div className="iete-footer-column">
              <h3>FIND US</h3>
              <address>
                BIT Sindri
                <br />
                Dhanbad, Jharkhand
                <br />
                India
              </address>
            </div>

            <div className="iete-footer-column">
              <h3>CONTACT US</h3>
              <div className="iete-footer-links">
                <a href="mailto:ietebits@gmail.com">ietebits@gmail.com</a>
                <a href="tel:+919890474518">+91-9890474518</a>
                <a href="tel:+919546003148">+91-9546003148</a>
              </div>
            </div>

            <div className="iete-footer-column">
              <h3>GET IN TOUCH</h3>
              <p className="iete-footer-note">
                Have something to share? Send us a message.
              </p>

              <form
                className="iete-mail-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  const subject = encodeURIComponent("Hello IETE-SF");
                  const body = encodeURIComponent(
                    `My email address: ${footerEmail}\n\n`
                  );
                  window.location.href = `mailto:ietebits@gmail.com?subject=${subject}&body=${body}`;
                }}
              >
                <label className="sr-only" htmlFor="iete-about-footer-email">
                  Your email address
                </label>
                <input
                  id="iete-about-footer-email"
                  type="email"
                  value={footerEmail}
                  onChange={(event) => setFooterEmail(event.target.value)}
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                <button type="submit">
                  Send <span aria-hidden="true">↗</span>
                </button>
              </form>
              <p className="iete-footer-note iete-mail-hint">
                Opens your default email application.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="iete-footer-bottom">
            <p>Copyright © 2026 IETE-SF. All rights reserved.</p>
            <p>Designed &amp; Developed by: Team IETE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
