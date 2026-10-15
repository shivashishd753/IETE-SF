
"use client";

import { useState, useEffect } from "react";
import IntroLoader from "./components/introloader";

import Navbar from "./components/navbar";
import Footer from "./components/footer";


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
  const [logoOpacity, setLogoOpacity] = useState(1);
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


<Navbar />


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

    


{/* Falling-letter welcome animation */}
<div className="welcome-formation mt-5 flex w-full flex-col items-center sm:mt-7">
  <h2 className="flex flex-col items-center gap-1 text-center font-black uppercase">
    <span className="welcome-word flex justify-center text-sm tracking-[0.45em] text-cyan-200 sm:text-lg">
      {"WELCOME".split("").map((letter, i) => (
        <span
          key={`welcome-${i}`}
          className="fall-letter"
          style={{
            "--i": i,
            "--x": `${((i * 37) % 7 - 3) * 65}px`,
            "--y": `${((i * 23) % 5 - 2) * 70}px`,
          }}
        >
          {letter}
        </span>
      ))}
    </span>

    <span className="flex flex-wrap justify-center gap-x-3 text-4xl leading-tight sm:gap-x-4 sm:text-6xl md:text-7xl">
      {"BATCH".split("").map((letter, i) => (
        <span
          key={`batch-${i}`}
          className="fall-letter text-white"
          style={{
            "--i": i + 7,
            "--x": `${((i * 41) % 7 - 3) * 75}px`,
            "--y": `${((i * 29) % 5 - 2) * 75}px`,
          }}
        >
          {letter}
        </span>
      ))}

      {"2K26".split("").map((letter, i) => (
        <span
          key={`year-${i}`}
          className="fall-letter bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent"
          style={{
            "--i": i + 12,
            "--x": `${((i * 31) % 7 - 3) * 80}px`,
            "--y": `${((i * 19) % 5 - 2) * 85}px`,
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  </h2>

  <div className="welcome-formation-line mt-3 h-[2px] w-28 rounded-full bg-cyan-400 sm:mt-4 sm:w-40" />
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


<Footer />
    </main>
    </>
  );
}
