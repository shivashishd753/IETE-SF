"use client";

import { useEffect, useRef, useState } from "react";
import { Send, ArrowUpRight, Mail, Phone, UsersRound, MapPin } from "lucide-react";
import { gsap } from "gsap";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const WATERMARK_PARTICLE_POSITIONS = [
  [19, 10], [23, 56], [27, 128], [30, -8], [33, 92], [36, 34], [39, 142],
  [42, 8], [45, 112], [48, 44], [51, 136], [54, -4], [57, 76], [60, 126],
  [63, 20], [66, 98], [69, 4], [72, 140], [75, 52], [78, 112], [81, 18],
  [84, 86], [25, 24], [35, 68], [47, 2], [59, 60], [71, 34], [82, 134],
];

/* ─────── Cute SVG Bot — smooth continuous border crawl ─────── */
function BorderBot({ containerRef }) {
  const botRef = useRef(null);

  useEffect(() => {
    const bot = botRef.current;
    const container = containerRef.current;
    if (!bot || !container) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = bot.parentElement;
    if (!host) return;

    let raf = 0;
    let intentTimeout;
    let stopped = false;
    let t = Math.random();
    let direction = 1;
    let lastTime = 0;
    let velocity = prefersReducedMotion ? 0.000018 : 0.00004;
    let targetVelocity = velocity;

    const changeIntent = () => {
      if (stopped) return;
      const roll = Math.random();
      if (roll < 0.18) {
        targetVelocity = prefersReducedMotion ? 0.000012 : 0.000024;
      } else if (roll < 0.3) {
        direction *= -1;
        targetVelocity = prefersReducedMotion
          ? 0.000014 + Math.random() * 0.000012
          : 0.000055 + Math.random() * 0.00005;
      } else {
        targetVelocity = prefersReducedMotion
          ? 0.000012 + Math.random() * 0.000018
          : 0.000024 + Math.random() * 0.000076;
      }
      intentTimeout = setTimeout(changeIntent, 2600 + Math.random() * 4200);
    };

    const tick = (now) => {
      if (stopped) return;
      if (!lastTime) lastTime = now;
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      const easing = 1 - Math.pow(0.992, dt);
      velocity += (targetVelocity - velocity) * easing;
      t = ((t + velocity * dt * direction) % 1 + 1) % 1;

      const frame = container.getBoundingClientRect();
      const hostRect = host.getBoundingClientRect();
      const size = bot.getBoundingClientRect().width || 30;
      const width = frame.width;
      const height = frame.height;
      const distance = t * 2 * (width + height);
      let x;
      let y;
      if (distance < width) {
        x = distance;
        y = 0;
      } else if (distance < width + height) {
        x = width;
        y = distance - width;
      } else if (distance < 2 * width + height) {
        x = width - (distance - width - height);
        y = height;
      } else {
        x = 0;
        y = height - (distance - 2 * width - height);
      }

      // Position from live element bounds, so the sprite tracks the real frame
      // even when its parent padding or responsive dimensions change.
      bot.style.left = `${frame.left - hostRect.left + x - size / 2}px`;
      bot.style.top = `${frame.top - hostRect.top + y - size / 2}px`;

      raf = requestAnimationFrame(tick);
    };

    intentTimeout = setTimeout(changeIntent, 1800 + Math.random() * 1400);
    raf = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(intentTimeout);
    };
  }, [containerRef]);

  return (
    <svg
      ref={botRef}
      className="ct-bot"
      viewBox="0 0 44 44"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ctBotShell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e2ebfa" />
          <stop offset="1" stopColor="#9bb5df" />
        </linearGradient>
        <linearGradient id="ctBotScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#202b3d" />
          <stop offset="1" stopColor="#101722" />
        </linearGradient>
      </defs>

      {/* soft halo and antenna */}
      <circle cx="22" cy="22" r="20" fill="#9ab5eb" opacity=".10" />
      <path d="M22 8V5" stroke="#a8c2ef" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="4" r="2.2" fill="#b9cdf0">
        <animate attributeName="r" values="2.1;2.8;2.1" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".75;1;.75" dur="2.8s" repeatCount="indefinite" />
      </circle>

      {/* little side hands */}
      <path d="M7 21 3.8 19.5M37 21l3.2-1.5" fill="none" stroke="#a8c2ef" strokeWidth="2" strokeLinecap="round">
        <animate attributeName="d" values="M7 21 3.8 19.5M37 21l3.2-1.5;M7 21 3.4 17.5M37 21l3.6-3.5;M7 21 3.8 19.5M37 21l3.2-1.5" dur="3.6s" repeatCount="indefinite" />
      </path>
      <circle cx="3.8" cy="19.5" r="1.6" fill="#dce7f8" />
      <circle cx="40.2" cy="19.5" r="1.6" fill="#dce7f8" />

      {/* bright shell and face */}
      <rect x="5" y="8" width="34" height="29" rx="10" fill="url(#ctBotShell)" stroke="#f1f5fc" strokeWidth="1" />
      <path d="M11 10.5h22" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity=".62" />
      <rect x="9" y="13" width="26" height="16" rx="6" fill="url(#ctBotScreen)" />

      {/* bright, curious eyes */}
      <ellipse cx="16.5" cy="20" rx="2.2" ry="2.4" fill="#c6d9fb">
        <animate attributeName="ry" values="2.4;.25;2.4" dur="5.2s" repeatCount="indefinite" keyTimes="0;.025;.05" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1" />
      </ellipse>
      <ellipse cx="27.5" cy="20" rx="2.2" ry="2.4" fill="#c6d9fb">
        <animate attributeName="ry" values="2.4;.25;2.4" dur="5.2s" repeatCount="indefinite" begin=".06s" keyTimes="0;.025;.05" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1" />
      </ellipse>
      <circle cx="17.2" cy="19.5" r=".7" fill="#fff" opacity=".8" />
      <circle cx="28.2" cy="19.5" r=".7" fill="#fff" opacity=".8" />
      <circle cx="12.5" cy="24.5" r="1.5" fill="#91a9d0" opacity=".65" />
      <circle cx="31.5" cy="24.5" r="1.5" fill="#91a9d0" opacity=".65" />
      <path d="M19.5 24.5q2.5 2.2 5 0" fill="none" stroke="#d5e2f8" strokeWidth="1" strokeLinecap="round" />

      {/* little feet */}
      <rect x="12" y="35" width="7" height="3" rx="1.5" fill="#8199c0" />
      <rect x="25" y="35" width="7" height="3" rx="1.5" fill="#8199c0" />
    </svg>
  );
}

/* ─────── Particle field background ─────── */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    let raf;
    let stopped = false;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create floating particles
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      r: 0.4 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.12,
      opacity: 0.035 + Math.random() * 0.09,
    }));

    const draw = () => {
      if (stopped) return;
      const w = W();
      const h = H();
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(145, 174, 227, ${p.opacity})`;
        ctx.fill();
      }

      // Draw faint lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(145, 174, 227, ${0.025 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { stopped = true; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="ct-particles" />;
}

/* ════════════════════════════════════════════
   CONTACT PAGE
   ════════════════════════════════════════════ */
export default function ContactPage() {
  const formCardRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const contactCardRefs = useRef([]);
  const watermarkDotsRef = useRef([]);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const animateWatermark = (event) => {
    event.currentTarget.classList.add("is-hovered");
    updateWatermarkPointer(event);
  };

  const updateWatermarkPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  const resetWatermark = (event) => {
    event.currentTarget.classList.remove("is-hovered");
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dots = watermarkDotsRef.current.filter(Boolean);
    dots.forEach((dot) => {
      gsap.to(dot, {
        x: () => gsap.utils.random(-28, 28),
        y: () => gsap.utils.random(-22, 22),
        opacity: () => gsap.utils.random(.2, .58),
        scale: () => gsap.utils.random(.85, 1.5),
        duration: () => gsap.utils.random(2.2, 5.6),
        delay: () => gsap.utils.random(0, 2.8),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
      });
    });

    return () => dots.forEach((dot) => gsap.killTweensOf(dot));
  }, []);

  const animateTitleTiles = () => {
    const letters = titleRef.current?.querySelectorAll(".ct-title-letter");
    if (!letters) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    letters.forEach((letter, index) => {
      const lift = reduced ? 2 : 5 + Math.random() * 5;
      const tilt = reduced ? 1 : (Math.random() - 0.5) * 12;
      letter.animate(
        [
          { transform: "translateY(0) rotate(0) scale(1)", backgroundColor: "transparent", boxShadow: "none" },
          { transform: `translateY(-${lift}px) rotate(${tilt}deg) scale(1.08)`, backgroundColor: "rgba(96, 139, 218, .14)", boxShadow: "0 8px 18px rgba(38, 74, 139, .16)" },
          { transform: "translateY(0) rotate(0) scale(1)", backgroundColor: "transparent", boxShadow: "none" },
        ],
        { duration: reduced ? 320 : 540 + Math.random() * 220, delay: index * 26, easing: "cubic-bezier(.2,.8,.25,1)" }
      );
    });
  };

  const animateContactCard = (index, active) => {
    const card = contactCardRefs.current[index];
    if (!card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(card);
    gsap.to(card, {
      y: active && !reduced ? -6 : 0,
      scale: active && !reduced ? 1.025 : 1,
      rotateX: active && !reduced ? 2 : 0,
      rotateY: active && !reduced ? (index % 2 ? -1.5 : 1.5) : 0,
      zIndex: active ? 60 : 0,
      duration: reduced ? 0.12 : active ? 0.38 : 0.3,
      ease: active ? "power3.out" : "power2.out",
      boxShadow: active ? "0 24px 52px rgba(0,0,0,.55), 0 8px 24px rgba(51,91,159,.12)" : "0 0 0 rgba(0,0,0,0)",
    });
  };

  /* ── GSAP entrance ── */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Clear transforms from a prior hot reload before positioning the watermark in normal flow.
      gsap.set(".ct-watermark", { clearProps: "transform" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Reveal the oversized watermark as the first visual on route entry.
      tl.fromTo(".ct-watermark",
        { opacity: 0, filter: "blur(12px)", clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, filter: "blur(0px)", clipPath: "inset(0 0% 0 0)", duration: 1.45, ease: "power3.out", onComplete: () => gsap.set(".ct-watermark", { clearProps: "transform" }) },
        0
      );

      // Title
      tl.from(".ct-title", { y: 40, opacity: 0, duration: 0.9 }, 0.4);

      // Subtitle
      tl.from(".ct-sub", { y: 20, opacity: 0, duration: 0.7 }, 0.6);

      // Contact cards stagger
      tl.from(".ct-card", {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
      }, 0.7);

      // Socials
      tl.from(".ct-soc", {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "back.out(2.5)",
      }, 1.0);

      // Form
      tl.from(".ct-form-card", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      }, 0.5);

    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name || "Visitor"}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:ietebits@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contacts = [
    { kind: "general", icon: <Mail className="ct-card-icon" size={20} strokeWidth={1.7} />, label: "GENERAL QUERIES", email: "contact@ietebits.com", phone: "+91 9142040066" },
    { kind: "support", icon: <UsersRound className="ct-card-icon" size={20} strokeWidth={1.7} />, label: "INDUCTIONS & SUPPORT", people: [{ name: "Aditya Raj", phone: "+91 9142040066" }, { name: "Amit Kumar Gupta", phone: "+91 6200983787" }] },
    { kind: "location", icon: <MapPin className="ct-card-icon" size={20} strokeWidth={1.7} />, label: "OUR LOCATION", location: "BIT Sindri, Dhanbad, Jharkhand, India — 828122", href: "https://maps.google.com/?q=BIT+Sindri+Dhanbad" },
  ];

  return (
    <main className={`ct-page${hoveredCard !== null ? " ct-card-focus" : ""}`}>
      <style>{`
        /* ══════════ RESET & BASE ══════════ */
        .ct-page {
          --black: #070912;
          --card: #0d1120;
          --border: #222a40;
          --border-hover: #3c527b;
          --white: #e8eaf0;
          --gray: #858b99;
          --dim: #626a79;
          --accent: #91b9ff;
          --accent-dim: rgba(104, 151, 232, .09);
          --accent-glow: rgba(69, 112, 197, .08);
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 72% 36%, rgba(26, 55, 112, .19), transparent 48%),
            radial-gradient(ellipse at 12% 76%, rgba(26, 43, 91, .13), transparent 42%),
            linear-gradient(145deg, #05060b 0%, #090d1a 54%, #070912 100%);
          color: var(--white);
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }
        .ct-page ::selection { color: #000; background: var(--accent); }

        /* ══════════ HERO ══════════ */
        .ct-hero {
          position: relative;
          box-sizing: border-box;
          min-height: 118svh;
          padding: 135px 7vw clamp(100px, 12vh, 136px);
          overflow: hidden;
        }

        .ct-focus-backdrop {
          position: absolute;
          inset: 0;
          z-index: 40;
          background: rgba(2, 4, 10, .24);
          backdrop-filter: blur(5px);
          opacity: 0;
          pointer-events: none;
          transition: opacity .32s ease;
        }
        .ct-page.ct-card-focus .ct-focus-backdrop { opacity: 1; }
        .ct-page.ct-card-focus .ct-grid { z-index: 51; }
        .ct-page.ct-card-focus > nav,
        .ct-page.ct-card-focus .ct-left > :not(.ct-cards),
        .ct-page.ct-card-focus .ct-card:not(.is-focused),
        .ct-page.ct-card-focus .ct-form-wrap,
        .ct-page.ct-card-focus > .iete-footer {
          filter: blur(4px);
          opacity: .2;
          transition: filter .24s ease, opacity .24s ease;
        }

        /* Background glow — top center, very subtle */
        .ct-glow {
          position: absolute;
          top: -15%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(73,119,211,.13) 0%, rgba(31,54,104,.05) 34%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: ct-haze 12s ease-in-out infinite alternate;
        }

        /* Watermark */
        .ct-watermark {
          position: relative;
          display: block;
          top: auto;
          left: auto;
          right: auto;
          transform: none !important;
          width: 100%;
          max-width: 100%;
          margin: 0 auto 20px;
          white-space: nowrap;
          text-align: center;
          font-family: "Arial Black", Arial, Helvetica, sans-serif;
          font-size: clamp(72px, 12vw, 180px);
          font-weight: 900;
          letter-spacing: -.05em;
          color: rgba(43, 65, 103, .22);
          -webkit-text-stroke: 1px rgba(82, 112, 160, .06);
          filter: none;
          opacity: 1;
          user-select: none;
          pointer-events: none;
          z-index: 0;
          line-height: .8;
        }
        .ct-watermark-word {
          position: relative;
          display: inline-block;
          isolation: isolate;
          pointer-events: auto;
          cursor: crosshair;
          transition: color .25s ease, text-shadow .25s ease;
        }
        .ct-watermark-word::before,
        .ct-watermark-word::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity .28s ease;
        }
        .ct-watermark-word::after {
          z-index: 1;
          color: transparent;
          -webkit-text-fill-color: transparent;
          background: radial-gradient(ellipse 150px 90px at var(--pointer-x, 50%) var(--pointer-y, 50%), rgba(226,237,255,.62), rgba(143,177,240,.25) 42%, transparent 76%);
          background-clip: text;
          -webkit-background-clip: text;
        }
        .ct-watermark-word.is-hovered {
          text-shadow: 0 0 14px rgba(132,164,223,.1);
        }
        .ct-watermark-word.is-hovered::after { opacity: .8; }
        .ct-watermark-dot {
          position: absolute;
          display: block;
          width: var(--dot-size, 2px);
          height: var(--dot-size, 2px);
          border-radius: 50%;
          background: #b9ceff;
          box-shadow: 0 0 8px 1px rgba(119,158,245,.38);
          opacity: .2;
          pointer-events: none;
          transition: opacity .35s ease;
        }
        .ct-watermark-word.is-hovered ~ .ct-watermark-dot { filter: brightness(1.35); }

        /* Particle canvas */
        .ct-particles {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* ══════════ GRID ══════════ */
        .ct-grid {
          position: relative;
          z-index: 1;
          display: grid;
          width: 100%;
          max-width: 1180px;
          grid-template-columns: 1fr 1.1fr;
          gap: clamp(40px, 6vw, 80px);
          margin: 0 auto;
          align-items: start;
        }

        /* ══════════ LEFT ══════════ */
        .ct-left { display: flex; flex-direction: column; padding-top: 4px; }

        .ct-title {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(36px, 3.35vw, 48px);
          font-weight: 600;
          letter-spacing: -.055em;
          line-height: 1.05;
          color: #f4f5f8;
        }
        .ct-title-letter {
          display: inline-block;
          position: relative;
          color: #f4f5f8;
          white-space: pre;
          border-radius: .09em;
          transform-origin: 50% 80%;
          will-change: transform;
        }

        .ct-sub {
          max-width: 380px;
          margin: 12px 0 24px;
          color: var(--gray);
          font-size: 13px;
          line-height: 1.7;
        }

        /* ══════════ CONTACT CARDS ══════════ */
        .ct-cards { position: relative; display: flex; flex-direction: column; gap: 12px; perspective: 1000px; }

        .ct-card {
          box-sizing: border-box;
          position: relative;
          z-index: 0;
          display: grid;
          grid-template-columns: 40px minmax(0, 1fr) auto;
          align-items: center;
          gap: 13px;
          min-height: 76px;
          padding: 13px 15px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: rgba(13,17,32,.92);
          overflow: visible;
          transform-style: preserve-3d;
          will-change: transform;
          transition: border-color .2s ease, background-color .2s ease;
          cursor: pointer;
        }
        .ct-card:hover {
          border-color: #30374a;
          background-color: #0d1221;
        }
        .ct-card.is-focused { border-color: #52607a; background: #0e1422; }

        .ct-card-icon {
          display: grid;
          width: 38px;
          height: 38px;
          padding: 9px;
          box-sizing: border-box;
          border: 1px solid rgba(169,184,214,.14);
          border-radius: 10px;
          background: rgba(255,255,255,.035);
          color: #c8d1e0;
          flex-shrink: 0;
        }

        .ct-card-body {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
          flex: 1;
        }
        .ct-card-label { color: #e3e7ef; font-size: 11px; font-weight: 700; letter-spacing: .14em; }
        .ct-card-hint { color: #858d9d; font-size: 11px; line-height: 1.4; }
        .ct-card-detail {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          display: grid;
          gap: 10px;
          padding: 15px 16px;
          border: 1px solid rgba(153,174,211,.2);
          border-radius: 12px;
          background: rgba(10,14,25,.97);
          box-shadow: 0 20px 46px rgba(0,0,0,.44);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-7px) scale(.985);
          transform-origin: top center;
          transition: opacity .22s ease, transform .28s cubic-bezier(.2,.8,.2,1), visibility .22s;
          pointer-events: none;
        }
        .ct-card.is-focused .ct-card-detail {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .ct-detail-caption { color: #78849a; font-size: 9px; font-weight: 700; letter-spacing: .16em; }
        .ct-detail-line { display: flex; align-items: center; gap: 9px; min-width: 0; color: #c5ccda; font-size: 12px; line-height: 1.5; }
        .ct-detail-line svg { flex: 0 0 auto; color: #a8b8d4; }
        .ct-detail-line a { color: inherit; text-decoration: none; overflow-wrap: anywhere; }
        .ct-detail-line a:hover { color: #f1f3f8; }
        .ct-detail-people { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
        .ct-detail-person { display: grid; gap: 5px; min-width: 0; }
        .ct-detail-person + .ct-detail-person { border-left: 1px solid rgba(169,184,214,.16); padding-left: 12px; }
        .ct-detail-person strong { color: #e3e7ef; font-size: 12px; font-weight: 600; }
        .ct-detail-person a { color: #aab3c2; font-size: 11px; text-decoration: none; }
        .ct-card.is-focused .ct-card-arrow { color: #edf1f7; }
        .ct-card-arrow { transition: color .2s ease, border-color .2s ease, background .2s ease; }
        .ct-card.is-focused .ct-card-arrow { border-color: rgba(169,184,214,.28); background: rgba(255,255,255,.08); }
        .ct-card-meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .ct-meta-item { display: flex; min-width: 0; align-items: center; gap: 7px; color: #9ba4b4; font-size: 11px; line-height: 1.45; }
        .ct-meta-item a { min-width: 0; color: #9ba4b4; text-decoration: none; overflow-wrap: anywhere; }
        .ct-meta-item a:hover { color: #eef2f9; }
        .ct-meta-item svg { flex: 0 0 auto; color: #9fb7dd; }
        .ct-support-inline { display: flex; align-items: center; gap: 13px; }
        .ct-support-entry { display: flex; min-width: 0; flex-direction: column; gap: 3px; }
        .ct-support-entry strong { color: #e5e9f1; font-size: 11px; font-weight: 600; }
        .ct-support-entry a { color: #9ba4b4; font-size: 10.5px; text-decoration: none; white-space: nowrap; }
        .ct-support-entry a:hover { color: #eef2f9; }
        .ct-support-entry + .ct-support-entry { padding-left: 13px; border-left: 1px solid rgba(169,184,214,.16); }
        .ct-location-text { color: #a5adbb; font-size: 11px; line-height: 1.45; text-decoration: none; }
        .ct-location-text:hover { color: #eef2f9; }
        .ct-card-arrow { display: grid; width: 27px; height: 27px; flex: 0 0 auto; place-items: center; border: 1px solid rgba(169,184,214,.12); border-radius: 50%; color: #c0c7d3; background: rgba(255,255,255,.04); }
        .ct-card-arrow svg { transition: transform .24s cubic-bezier(.2,.8,.2,1); }
        .ct-card.is-focused .ct-card-arrow svg { transform: translate(1px,-1px); }
        .ct-copy {
          display: grid;
          width: 24px; height: 24px;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 6px;
          background: transparent;
          color: var(--dim);
          cursor: pointer;
          transition: .2s;
          flex-shrink: 0;
          margin-left: auto;
        }
        .ct-copy:hover {
          border-color: var(--border-hover);
          color: var(--accent);
        }

        /* ══════════ SOCIALS ══════════ */
        .ct-socials {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
        }
        .ct-soc {
          display: grid;
          width: 32px; height: 32px;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: transparent;
          color: var(--dim);
          text-decoration: none;
          transition: .25s;
        }
        .ct-soc svg { width: 13px; height: 13px; fill: currentColor; }
        .ct-soc:hover {
          border-color: var(--border-hover);
          color: var(--white);
          transform: translateY(-2px);
        }
        .ct-soc-label {
          margin-left: 6px;
          color: var(--dim);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .14em;
        }

        /* ══════════ FORM ══════════ */
        .ct-form-wrap {
          position: relative;
          padding-top: 8px;
        }

        .ct-bot {
          position: absolute;
          top: 0; left: 0;
          width: 30px; height: 30px;
          z-index: 10;
          pointer-events: none;
          filter: drop-shadow(0 0 8px rgba(81,139,244,.48));
          will-change: left, top;
        }

        .ct-form-card {
          position: relative;
          border: 1px solid var(--border);
          border-radius: 16px;
          background: linear-gradient(145deg, rgba(16,21,38,.97), rgba(10,13,24,.98));
          overflow: hidden;
        }

        /* Top accent line */
        .ct-form-card::before {
          content: "";
          position: absolute;
          top: 0; left: 30px;
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(154,181,235,.20), transparent);
        }

        .ct-form-head {
          padding: 24px 26px 18px;
          border-bottom: 1px solid var(--border);
        }
        .ct-form-head h2 {
          margin: 0;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 400;
          letter-spacing: -.025em;
          color: var(--white);
        }
        .ct-form-head p {
          margin: 6px 0 0;
          color: var(--dim);
          font-size: 11px;
          line-height: 1.6;
        }

        .ct-form-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 22px 26px 26px;
        }

        .ct-field input, .ct-field textarea {
          box-sizing: border-box;
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 10px;
          outline: none;
          background: rgba(255,255,255,.02);
          padding: 14px 15px;
          color: var(--white);
          font: 400 13px Arial, Helvetica, sans-serif;
          transition: border-color .3s, box-shadow .3s;
        }
        .ct-field input { min-height: 48px; }
        .ct-field textarea { min-height: 120px; resize: vertical; }
        .ct-field input::placeholder, .ct-field textarea::placeholder { color: #747b89; }
        .ct-field input:focus, .ct-field textarea:focus {
          border-color: #7185a8;
          box-shadow: 0 0 0 3px rgba(154,181,235,.09);
        }

        .ct-submit {
          display: flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--white);
          color: #000;
          font: 700 12px Arial, Helvetica, sans-serif;
          letter-spacing: .03em;
          cursor: pointer;
          transition: .3s;
        }
        .ct-submit:hover {
          background: #fff;
          box-shadow: 0 0 30px rgba(255,255,255,.06);
          transform: translateY(-1px);
        }
        .ct-submit:active { transform: translateY(0) scale(.99); }

        /* Keep the shared footer in the contact page's charcoal and soft-blue palette. */
        .ct-page .iete-footer {
          border-top-color: rgba(115,151,216,.16);
          background:
            radial-gradient(ellipse at 50% 0%, rgba(29,52,101,.18), transparent 52%),
            #070912;
          color: #c1c6d0;
        }
        .ct-page .iete-footer-glow { background: rgba(126,157,215,.09); }
        .ct-page .iete-footer-top,
        .ct-page .iete-footer-bottom { border-color: rgba(154,181,235,.11); }
        .ct-page .iete-footer-brand { color: #e8eaf0; }
        .ct-page .iete-brand-dot { color: var(--accent); }
        .ct-page .iete-footer-column h3 { color: #e0e4ec; }
        .ct-page .iete-footer-links a,
        .ct-page .iete-footer-column address,
        .ct-page .iete-footer-note { color: #9299a7; }
        .ct-page .iete-footer-links a:hover { color: #b8c9ea; }
        .ct-page .iete-footer-bottom p { color: #717988; }
        .ct-page .iete-social-link {
          border-color: rgba(154,181,235,.16);
          background: rgba(255,255,255,.025);
          color: #aeb8ca;
        }
        .ct-page .iete-social-link:hover {
          border-color: rgba(154,181,235,.42);
          background: rgba(154,181,235,.08);
          color: #c2d1ef;
        }
        .ct-page .iete-join-footer {
          border-color: rgba(154,181,235,.22);
          background: rgba(154,181,235,.055);
          color: #c5d0e6;
        }
        .ct-page .iete-join-footer:hover {
          border-color: rgba(154,181,235,.48);
          background: rgba(154,181,235,.10);
        }
        .ct-page .iete-mail-form input:focus {
          border-color: rgba(154,181,235,.52);
          background: rgba(255,255,255,.045);
        }
        .ct-page .iete-mail-form button {
          border-color: rgba(154,181,235,.24);
          background: #171d29;
          color: #dbe3f2;
        }
        .ct-page .iete-mail-form button:hover {
          border-color: rgba(154,181,235,.48);
          background: #202938;
        }
        .ct-page .iete-social-link:focus-visible,
        .ct-page .iete-join-footer:focus-visible,
        .ct-page .iete-mail-form button:focus-visible,
        .ct-page .iete-footer-links a:focus-visible {
          outline-color: #9ab5eb;
        }

        /* ══════════ KEYFRAMES ══════════ */
        @keyframes ct-haze {
          from { opacity: .65; transform: translateX(-50%) scale(.94); }
          to { opacity: 1; transform: translateX(-50%) scale(1.06); }
        }

        /* ══════════ RESPONSIVE ══════════ */
        @media (max-width: 900px) {
          .ct-hero { min-height: 110svh; padding: 135px 6vw 100px; }
          .ct-grid { grid-template-columns: 1fr; max-width: 560px; gap: 36px; }
          .ct-watermark { font-size: clamp(58px, 15vw, 132px); }
          .ct-glow { width: 500px; height: 350px; }
        }
        @media (max-width: 560px) {
          .ct-hero { min-height: 108svh; padding: 135px 5vw 80px; }
          .ct-grid { gap: 28px; }
          .ct-title { font-size: clamp(34px, 10vw, 44px); }
          .ct-form-card { border-radius: 13px; }
          .ct-form-head { padding: 18px 18px 14px; }
          .ct-form-body { padding: 16px 18px 20px; }
          .ct-card { padding: 11px 12px; }
          .ct-bot { width: 27px !important; height: 27px !important; }
          .ct-support-inline { gap: 8px; }
          .ct-support-entry + .ct-support-entry { padding-left: 8px; }
          .ct-card-meta { grid-template-columns: 1fr; gap: 5px; }
          .ct-card-detail { padding: 13px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ct-page *, .ct-page *::before, .ct-page *::after {
            animation: none !important;
            transition-duration: .01ms !important;
          }
          .ct-particles { display: none; }
          .ct-watermark-dot { transition: none; }
          .ct-watermark-word.is-hovered::after { opacity: 0; }
        }
      `}</style>

      <Navbar />

      <section className="ct-hero" ref={heroRef}>
        <div className="ct-focus-backdrop" aria-hidden="true" />
        {/* Background elements */}
        <div className="ct-glow" />
        <span className="ct-watermark" aria-hidden="true">
          <span
            className="ct-watermark-word"
            data-text="CONTACT"
            onPointerEnter={animateWatermark}
            onPointerMove={updateWatermarkPointer}
            onPointerLeave={resetWatermark}
          >
            CONTACT
          </span>
          {WATERMARK_PARTICLE_POSITIONS.map(([left, top], index) => (
            <i
              className="ct-watermark-dot"
              key={`watermark-dot-${index}`}
              ref={(node) => { watermarkDotsRef.current[index] = node; }}
              style={{
                left: `${left}%`,
                top: `${top}px`,
                "--dot-index": index,
                "--dot-size": `${index % 5 === 0 ? 3 : index % 3 === 0 ? 2.5 : 2}px`,
              }}
            />
          ))}
        </span>
        <ParticleField />

        <div className="ct-grid">
          {/* ─── LEFT ─── */}
          <div className="ct-left">
            <h1
              className="ct-title"
              ref={titleRef}
              aria-label="Get in touch"
              onPointerEnter={animateTitleTiles}
            >
              {"Get in touch".split("").map((letter, index) => (
                <span className="ct-title-letter" aria-hidden="true" key={`${letter}-${index}`}>
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))}
            </h1>

            <p className="ct-sub">
              Questions about the forum or an upcoming event? Email or call us — we&apos;re at BIT Sindri.
            </p>

            <div className="ct-cards">
              {contacts.map((c, i) => (
                <article
                  key={c.kind}
                  ref={(node) => { contactCardRefs.current[i] = node; }}
                  className={`ct-card${hoveredCard === i ? " is-focused" : ""}`}
                  onMouseEnter={() => { setHoveredCard(i); animateContactCard(i, true); }}
                  onMouseLeave={() => { setHoveredCard(null); animateContactCard(i, false); }}
                  onFocus={() => { setHoveredCard(i); animateContactCard(i, true); }}
                  onClick={(event) => {
                    if (event.target.closest("a")) return;
                    if (window.matchMedia("(hover: hover)").matches) return;
                    const next = hoveredCard === i ? null : i;
                    setHoveredCard(next);
                    animateContactCard(i, next === i);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      const next = hoveredCard === i ? null : i;
                      setHoveredCard(next);
                      animateContactCard(i, next === i);
                    }
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setHoveredCard(null);
                      animateContactCard(i, false);
                    }
                  }}
                  tabIndex={0}
                  aria-expanded={hoveredCard === i}
                  aria-label={`${c.label} contact details`}
                >
                  {c.icon}
                  <div className="ct-card-body">
                    <span className="ct-card-label">{c.label}</span>
                    <span className="ct-card-hint">
                      {c.kind === "general" ? "Email and phone" : c.kind === "support" ? "Help with inductions and support" : "BIT Sindri"}
                    </span>
                  </div>
                  <span className="ct-card-arrow" aria-hidden="true"><ArrowUpRight size={15} strokeWidth={1.8} /></span>
                  <div className="ct-card-detail">
                    <span className="ct-detail-caption">{c.kind === "general" ? "GENERAL QUERIES" : c.kind === "support" ? "INDUCTIONS & SUPPORT" : "OUR LOCATION"}</span>
                    {c.kind === "general" && (
                      <>
                        <div className="ct-detail-line"><Mail size={14} /><a href={`mailto:${c.email}`}>{c.email}</a></div>
                        <div className="ct-detail-line"><Phone size={14} /><a href={`tel:${c.phone.replaceAll(" ", "")}`}>{c.phone}</a></div>
                      </>
                    )}
                    {c.kind === "support" && (
                      <div className="ct-detail-people">
                        {c.people.map((person) => (
                          <div className="ct-detail-person" key={person.name}>
                            <strong>{person.name}</strong>
                            <a href={`tel:${person.phone.replaceAll(" ", "")}`}>{person.phone}</a>
                          </div>
                        ))}
                      </div>
                    )}
                    {c.kind === "location" && (
                      <div className="ct-detail-line"><MapPin size={14} /><a href={c.href} target="_blank" rel="noopener noreferrer">{c.location}</a></div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Socials */}
            <div className="ct-socials">
              {[
                { name: "Instagram", href: "https://www.instagram.com/ietebits/", icon: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.6" cy="6.7" r="1.2" /></> },
                { name: "X", href: "https://x.com/IETE_BITS", icon: <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.3L5.7 22H2.5l7.3-8.4L2 2h6.5l4.4 6.7zM17.8 20h1.7L7.4 3.9H5.6z" /> },
                { name: "LinkedIn", href: "https://www.linkedin.com/search/results/all/?keywords=IETE%20Students%27%20Forum%20BIT%20Sindri", icon: <path d="M5 8.5H2V22h3zM3.5 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6M22 13.8c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V8.5H10V22h3v-7.1c0-1.9.4-3.7 2.7-3.7s2.3 2.1 2.3 3.8V22h3z" /> },
                { name: "Facebook", href: "https://www.facebook.com/ietebits", icon: <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V13h2.8v8z" /> },
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="ct-soc">
                  <svg viewBox="0 0 24 24" aria-hidden="true">{s.icon}</svg>
                </a>
              ))}
              <span className="ct-soc-label">FOLLOW US</span>
            </div>
          </div>

          {/* ─── RIGHT — FORM ─── */}
          <div className="ct-form-wrap">
            <BorderBot containerRef={formCardRef} />
            <div className="ct-form-card" ref={formCardRef}>
              <div className="ct-form-head">
                <h2>Send a message</h2>
                <p>We&apos;ll get back to you within 24 hours.</p>
              </div>

              <form className="ct-form-body" onSubmit={handleSubmit}>
                <div className="ct-field">
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="ct-field">
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="ct-field">
                  <textarea
                    placeholder="Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="ct-submit">
                  {sent ? "Sent ✓" : "Submit"}
                  {!sent && <Send size={13} strokeWidth={2} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
