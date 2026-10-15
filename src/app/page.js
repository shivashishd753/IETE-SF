
"use client";

import { useState, useEffect } from "react";
import IntroLoader from "./components/introloader";

import {
  HomeIcon,
  Info,
  UsersRound,
  GraduationCap,
  CalendarDays,
  Layers3,
  Mail,
  LogIn,
} from "lucide-react";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [flyingSocial, setFlyingSocial] = useState(null);
  const [footerEmail, setFooterEmail] = useState("");

useEffect(() => {
  const handleScroll = () => {
    const fadeDistance = 500;
    const progress = Math.min(window.scrollY / fadeDistance, 1);

    setLogoOpacity(1 - progress);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
  <IntroLoader />
    <main id="home" className="min-h-screen overflow-hidden bg-[#070B18] text-white">


<nav className="fixed left-1/2 top-3 z-50 mt-3 flex min-h-[88px] w-[calc(100%-32px)] max-w-[1450px] -translate-x-1/2 items-center justify-between rounded-[24px] border border-white/[0.13] bg-[#080B12]/45 px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:px-8">


  {/* Logo */}
  <a href="#home" aria-label="IETE-SF Home"
    className="relative z-10 flex shrink-0 items-center">
    <img
      src="/logo.svg"
      alt="IETE-SF"
      className="h-[60px] w-[60px] object-contain"
    />
  </a>

  {/* Centered desktop navigation */}
  <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:flex 2xl:gap-7">
    {[
      { label: "Home", href: "#home", Icon: HomeIcon },
      { label: "About", href: "/about", Icon: Info },
      { label: "Members", href: "#members", Icon: UsersRound },
      { label: "Alumni", href: "#alumni", Icon: GraduationCap },
      { label: "Events", href: "#events", Icon: CalendarDays },
      { label: "Domains", href: "#domains", Icon: Layers3 },
      { label: "Contact", href: "#contact", Icon: Mail },
    ].map(({ label, href, Icon }) => (
      <a
        key={label}
        href={href}
        className="group relative flex items-center gap-2.5 whitespace-nowrap py-3 text-[15px] font-medium tracking-wide text-slate-200/90 transition-colors duration-300 hover:text-cyan-300"
      >
        <Icon
          size={19}
          strokeWidth={1.8}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-300"
        />
        <span>{label}</span>
        <span className="absolute bottom-0 left-0 h-px w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full" />
      </a>
    ))}
  </div>

  {/* Login */}
  <a
    href="/login"
    className="relative z-10 hidden shrink-0 items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/[0.07] hover:text-cyan-200 sm:flex"
  >
    <LogIn size={18} strokeWidth={1.8} />
    Login
  </a>

  {/* Mobile menu */}
  <div className="relative z-10 ml-auto flex items-center gap-3 xl:hidden">
    <a
      href="/login"
      aria-label="Member Login"
      className="rounded-xl border border-white/15 p-3 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-300 sm:hidden"
    >
      <LogIn size={20} />
    </a>

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
        { label: "Home", href: "#home", Icon: HomeIcon },
        { label: "About", href: "#about", Icon: Info },
        { label: "Members", href: "#members", Icon: UsersRound },
        { label: "Alumni", href: "#alumni", Icon: GraduationCap },
        { label: "Events", href: "#events", Icon: CalendarDays },
        { label: "Domains", href: "#domains", Icon: Layers3 },
        { label: "Contact", href: "#contact", Icon: Mail },
      ].map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm text-slate-200 transition hover:bg-cyan-300/[0.07] hover:text-cyan-200"
        >
          <Icon size={19} strokeWidth={1.8} />
          {label}
        </a>
      ))}

      <a
        href="/login"
        onClick={() => setMenuOpen(false)}
        className="mt-2 flex items-center gap-3 rounded-xl border border-cyan-300/20 px-4 py-3.5 text-sm text-cyan-100"
      >
        <LogIn size={19} />
        Member Login
      </a>
    </div>
  )}
</nav>


{/* Tech Udbhav + Join Us buttons
<div className="fixed left-1/2 top-[125px] z-40 flex
  -translate-x-1/2 items-center justify-center gap-3 sm:gap-5">

  {[
    {
      label: "Tech Udbhav",
      href: "https://techudbhav.ietebit.com/",
    },
    {
      label: "Join Us",
      href: "https://iete-induction-26.vercel.app/",
    },
  ].map((item) => (
    <a
      key={item.label}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-3
        overflow-hidden rounded-full border border-violet-300/30
        bg-gradient-to-r from-[#24104f]/95 via-[#17152f]/95
        to-[#071c35]/95 px-5 py-3 text-sm font-semibold
        tracking-wide text-white shadow-[0_0_22px_rgba(124,58,237,0.18)]
        backdrop-blur-xl transition-all duration-300
        hover:-translate-y-0.5 hover:border-cyan-300/70
        hover:shadow-[0_0_28px_rgba(34,211,238,0.25)]
        sm:px-7"
    >
      <span className="absolute inset-0 -translate-x-full
        bg-gradient-to-r from-transparent via-white/10 to-transparent
        transition-transform duration-700 group-hover:translate-x-full" />

      <span className="relative">{item.label}</span>

      <span className="relative flex h-6 w-6 items-center
        justify-center rounded-full border border-white/20
        bg-white/[0.08] text-cyan-200 transition-all duration-300
        group-hover:border-cyan-300/50 group-hover:bg-cyan-300/10
        group-hover:translate-x-0.5">
        ↗
      </span>
    </a>
  ))}
</div> */}


{/* Tech Udbhav + Join Us */}
<div className="absolute left-1/2 top-[125px] z-40 flex
  -translate-x-1/2 items-center gap-3 sm:gap-5">

  {[
    {
      label: "Tech Udbhav",
      href: "https://techudbhav.ietebit.com/",
    },
    {
      label: "Join Us",
      href: "https://iete-induction-26.vercel.app/",
    },
  ].map((item) => (
    <a
      key={item.label}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4
        rounded-xl border border-violet-400/40
        bg-[#0B0B19]/85 px-4 py-3
        shadow-[0_0_18px_rgba(139,92,246,0.12)]
        backdrop-blur-xl transition-all duration-300
        hover:border-cyan-300/70
        hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]
        sm:px-5"
    >
      <span className="h-2 w-2 shrink-0 rounded-full
        bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]
        transition-shadow group-hover:shadow-[0_0_15px_rgba(103,232,249,1)]" />

      <span className="whitespace-nowrap text-sm font-semibold
        tracking-wide text-white transition-colors
        group-hover:text-cyan-200">
        {item.label}
      </span>

      <span className="flex h-7 w-7 items-center justify-center
        rounded-lg border border-white/10 bg-white/[0.04]
        text-base text-violet-200 transition-all duration-300
        group-hover:translate-x-0.5 group-hover:border-cyan-300/40
        group-hover:bg-cyan-300/10 group-hover:text-cyan-200">
        ↗
      </span>
    </a>
  ))}
</div>





<section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-20 pt-36">
  {/* Simple dark background */}
  

{/* Layer 1: Navy base and blue ambient lighting */}
<div
  className="pointer-events-none absolute inset-0 z-0"
  style={{
    background: `
      radial-gradient(
        ellipse at 50% 43%,
        rgba(15, 91, 220, 0.20) 0%,
        rgba(12, 39, 91, 0.13) 30%,
        transparent 62%
      ),
      radial-gradient(
        ellipse at 50% 100%,
        rgba(13, 53, 115, 0.14) 0%,
        transparent 55%
      ),
      linear-gradient(
        135deg,
        #0b1020 0%,
        #070b17 48%,
        #03050b 100%
      )
    `,
  }}
/>

{/* Layer 2: Faint technical grid */}
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



  {/* Subtle blue light behind the logo */}
  <div
    className="pointer-events-none absolute left-1/2 top-[43%] -z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.08] blur-[100px] sm:h-[480px] sm:w-[480px]"
    style={{ opacity: logoOpacity }}
  />

  <div className="flex w-full max-w-5xl flex-col items-center text-center">
  

{/* <div className="relative z-30 mb-7 flex flex-col items-center sm:mb-8">
  <h1 className="flex items-center gap-2 text-2xl font-black uppercase tracking-[0.18em] sm:gap-3 sm:text-4xl sm:tracking-[0.24em]">
    <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
      IETE
    </span>

    <span className="h-6 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent sm:h-8" />

    <span className="bg-gradient-to-b from-cyan-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
      SF
    </span>
  </h1>

  <div className="mt-3 h-px w-20 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent sm:w-28" />

  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.28em] text-slate-400 sm:text-[10px] sm:tracking-[0.4em]">
    Students’ Forum
  </p>
</div> */}



    {/* Centerpiece logo */}
    <div
      className="w-full max-w-[min(76vw,520px)]"
      style={{
        opacity: logoOpacity,
        transform: `translateY(${(1 - logoOpacity) * -24}px)`,
        transition: "opacity 80ms linear",
        willChange: "opacity, transform",
      }}
    >
      <img
        src="/iete-3D.svg"
        alt="IETE-SF three-dimensional emblem"
        className="h-auto w-full object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.55)]"
        fetchPriority="high"
      />
    </div>

    <div className="mt-9 sm:mt-12">
      <p className="text-sm font-medium tracking-[0.32em] text-slate-200 sm:text-base">
        LEARN <span className="mx-2 text-blue-400">/</span>
        BUILD <span className="mx-2 text-blue-400">/</span>
        GROW
      </p>

      <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-slate-500 sm:text-xs sm:tracking-[0.4em]">
        Technology · Innovation · Community
      </p>
    </div>

    
{/* Welcome Batch */}
<div className="mt-7 flex flex-col items-center sm:mt-9">
  <p className="text-xs font-semibold uppercase tracking-[0.5em] text-cyan-200/80 sm:text-sm">
    WELCOMES
  </p>

  <h2
    className="mt-3 text-4xl font-black uppercase leading-tight tracking-[0.08em]
      text-transparent bg-clip-text
      bg-gradient-to-b from-white via-slate-100 to-cyan-300
      drop-shadow-[0_0_22px_rgba(34,211,238,0.18)]
      sm:text-6xl md:text-7xl sm:tracking-[0.12em]"
  >
    BATCH <span className="text-cyan-300">2K26</span>
  </h2>

  <div className="mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent sm:w-36" />
</div>


    <a
      href="#about"
      className="mt-14 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-slate-500 transition-colors hover:text-blue-300"
    >
      <span className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-600 p-1.5">
        <span className="h-2 w-1 rounded-full bg-blue-300" />
      </span>
      Scroll
    </a>
  </div>
</section>


<footer className="iete-footer">
  <div className="iete-footer-glow" />

  <div className="relative z-10 mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-12">
    {/* Brand and social links */}
    <div className="iete-footer-top">
      <a href="#home" className="iete-footer-brand" aria-label="IETE-SF Home">
        <img src="/logo.svg" alt="IETE-SF logo" />
        <span>IETE<span className="iete-brand-dot"></span></span>
      </a>

      <div className="iete-socials">
        {[
          {
            name: "Facebook",
            href: "https://www.facebook.com/ietebits",
            color: "#1877F2",
            icon: <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V13h2.8v8z" />
          },
          {
            name: "X",
            href: "https://x.com/IETE_BITS",
            color: "#E5E7EB",
            icon: <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.3L5.7 22H2.5l7.3-8.4L2 2h6.5l4.4 6.7zM17.8 20h1.7L7.4 3.9H5.6z" />
          },
          {
            name: "Instagram",
            href: "https://www.instagram.com/ietebits/",
            color: "#E879F9",
            icon: (
              <>
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.6" cy="6.7" r="1.2" />
              </>
            )
          },
          {
            name: "LinkedIn",
            href: "https://www.linkedin.com/search/results/all/?keywords=IETE%20Students%27%20Forum%20BIT%20Sindri&origin=RICH_QUERY_SUGGESTION&heroEntityKey=urn%3Ali%3Aorganization%3A42721036&position=0",
            color: "#0A66C2",
            icon: (
              <>
                <path d="M5 8.5H2V22h3zM3.5 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6M22 13.8c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V8.5H10V22h3v-7.1c0-1.9.4-3.7 2.7-3.7s2.3 2.1 2.3 3.8V22h3z" />
              </>
            )
          }
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
          <a href="#home">Home</a>
          <a href="#contact">Contact us</a>
          <a href="#about">About us</a>
          <a href="#events">Events</a>
        </nav>
      </div>

      <div className="iete-footer-column">
        <h3>FIND US</h3>
        <address>
          BIT Sindri<br />
          Dhanbad, Jharkhand<br />
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

            window.location.href =
              `mailto:ietebits@gmail.com?subject=${subject}&body=${body}`;
          }}
        >
          <label className="sr-only" htmlFor="iete-footer-email">
            Your email address
          </label>
          <input
            id="iete-footer-email"
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
      <p>
        Copyright © 2026 IETE-SF. All rights reserved.
      </p>
      <p>Designed &amp; Developed by: Team IETE</p>
    </div>
  </div>
</footer>


    </main>
    </>
  );
}
