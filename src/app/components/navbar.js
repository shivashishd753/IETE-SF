
"use client";

import { useState } from "react";
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", Icon: HomeIcon },
    { label: "About", href: "/about", Icon: Info },
    { label: "Members", href: "/members", Icon: UsersRound },
    { label: "Alumni", href: "#alumni", Icon: GraduationCap },
    { label: "Events", href: "#events", Icon: CalendarDays },
    { label: "Domains", href: "/domains", Icon: Layers3 },
    { label: "Contact", href: "#contact", Icon: Mail },
  ];

  return (
    <nav className="fixed left-1/2 top-3 z-50 mt-3 flex min-h-[88px] w-[calc(100%-32px)] max-w-[1450px] -translate-x-1/2 items-center justify-between rounded-[24px] border border-white/[0.13] bg-[#080B12]/45 px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:px-8">
      {/* Logo */}
      <a
        href="/"
        aria-label="IETE-SF Home"
        className="relative z-10 flex shrink-0 items-center"
      >
        <img
          src="/logo.svg"
          alt="IETE-SF"
          className="h-[60px] w-[60px] object-contain"
        />
      </a>

      {/* Centered desktop navigation */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:flex 2xl:gap-7">
        {navItems.map(({ label, href, Icon }) => (
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

      {/* Desktop login */}
      <a
        href="/login"
        className="relative z-10 hidden shrink-0 items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/[0.07] hover:text-cyan-200 sm:flex"
      >
        <LogIn size={18} strokeWidth={1.8} />
        Login
      </a>

      {/* Mobile controls */}
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

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-2xl border border-white/10 bg-[#080B12]/95 p-3 shadow-2xl backdrop-blur-2xl xl:hidden">
          {navItems.map(({ label, href, Icon }) => (
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
  );
}
