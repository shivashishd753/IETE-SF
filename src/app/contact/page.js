"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Copy, Check, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

/* ─────── Copy-to-clipboard ─────── */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(text); }
    catch { const el = document.createElement("textarea"); el.value = text; document.body.appendChild(el); el.select(); document.execCommand("copy"); document.body.removeChild(el); }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" onClick={handleCopy} aria-label={copied ? "Copied" : `Copy ${text}`} className="ct-copy">
      {copied ? <Check size={11} strokeWidth={2.5} /> : <Copy size={11} strokeWidth={2} />}
    </button>
  );
}

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

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Watermark text fade
      tl.from(".ct-watermark", { opacity: 0, scale: 1.05, duration: 1.8, ease: "power2.out" }, 0);

      // Badge
      tl.from(".ct-badge", { y: 15, opacity: 0, duration: 0.6 }, 0.3);

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
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="none" className="ct-card-icon">
          <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Email us",
      value: "contact@ietebits.com",
      href: "mailto:contact@ietebits.com",
      copyText: "contact@ietebits.com",
      detailLabel: "GENERAL ENQUIRIES",
      description: "For questions about IETE-SF, events, and collaborations.",
      action: "Send an email",
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="none" className="ct-card-icon">
          <path d="M5.5 2h3l1.5 4-2 1.5a10 10 0 004.5 4.5L14 10l4 1.5v3a2 2 0 01-2 2C8.5 16.5 3.5 11.5 3.5 4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Call us",
      value: "+91 9142040068",
      href: "tel:+919142040068",
      copyText: "+919142040068",
      detailLabel: "DIRECT LINE",
      description: "Speak with the IETE-SF BIT Sindri team by phone.",
      action: "Call now",
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="none" className="ct-card-icon">
          <path d="M10 11a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.3"/>
          <path d="M10 18s-6-4.35-6-9A6 6 0 0116 9c0 4.65-6 9-6 9z" stroke="currentColor" strokeWidth="1.3"/>
        </svg>
      ),
      label: "Our location",
      value: "BIT Sindri, Dhanbad, Jharkhand",
      href: "https://maps.google.com/?q=BIT+Sindri+Dhanbad",
      copyText: "BIT Sindri, Dhanbad, Jharkhand 828122",
      external: true,
      detailLabel: "VISIT THE FORUM",
      description: "BIT Sindri, Dhanbad, Jharkhand 828122.",
      action: "Get directions",
    },
  ];

  return (
    <main className={`ct-page${hoveredCard !== null ? " ct-has-expanded-contact" : ""}`}>
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
          display: flex;
          align-items: center;
          min-height: 100svh;
          padding: 120px 7vw 80px;
          overflow: hidden;
        }

        .ct-focus-backdrop {
          position: absolute;
          inset: 0;
          z-index: 40;
          background: rgba(2, 4, 10, .74);
          backdrop-filter: blur(4px);
          opacity: 0;
          pointer-events: none;
          transition: opacity .32s ease;
        }
        .ct-page.ct-has-expanded-contact .ct-focus-backdrop { opacity: 1; }
        .ct-page.ct-has-expanded-contact .ct-grid { z-index: 51; }
        .ct-page.ct-has-expanded-contact .ct-left > :not(.ct-cards),
        .ct-page.ct-has-expanded-contact .ct-card:not(.is-expanded),
        .ct-page.ct-has-expanded-contact .ct-form-wrap,
        .ct-page.ct-has-expanded-contact > nav,
        .ct-page.ct-has-expanded-contact > .iete-footer {
          filter: blur(3px);
          opacity: .24;
          transition: filter .2s ease, opacity .2s ease;
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
          position: absolute;
          top: 8%;
          right: 3%;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(100px, 14vw, 220px);
          font-weight: 700;
          letter-spacing: -.04em;
          color: transparent;
          background: linear-gradient(120deg, rgba(139,176,242,.16), rgba(87,125,200,.045));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 1px rgba(139,176,242,.19);
          filter: drop-shadow(0 0 42px rgba(66,111,201,.12));
          user-select: none;
          pointer-events: none;
          z-index: 0;
          line-height: 1;
        }

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
        .ct-left { display: flex; flex-direction: column; padding-top: 16px; }

        .ct-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          padding: 6px 14px 6px 10px;
          border: 1px solid var(--border);
          border-radius: 100px;
          background: var(--card);
          color: var(--gray);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .04em;
          margin-bottom: 24px;
        }
        .ct-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
          animation: ct-pulse 3s ease-in-out infinite;
        }

        .ct-title {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(42px, 5.2vw, 64px);
          font-weight: 600;
          letter-spacing: -.065em;
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
          margin: 16px 0 32px;
          color: var(--gray);
          font-size: 13px;
          line-height: 1.7;
        }

        /* ══════════ CONTACT CARDS ══════════ */
        .ct-cards { display: flex; flex-direction: column; gap: 10px; }

        .ct-card {
          box-sizing: border-box;
          position: relative;
          z-index: 0;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 14px;
          height: 68px;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: rgba(13,17,32,.92);
          overflow: hidden;
          transition: height .3s cubic-bezier(.22,1,.36,1), scale .28s cubic-bezier(.22,1,.36,1), border-color .2s ease, background-color .2s ease, box-shadow .2s ease;
          cursor: default;
        }
        .ct-card:hover {
          border-color: #30374a;
          background-color: #0d1221;
        }
        .ct-card.is-expanded {
          z-index: 2;
          height: 208px;
          scale: 1.025;
          will-change: height, scale;
          border-color: #424b61;
          border-radius: 15px;
          background: #0d1221;
          box-shadow: 0 18px 42px rgba(0,0,0,.62);
        }

        .ct-card-icon {
          width: 18px;
          height: 18px;
          color: var(--accent);
          flex-shrink: 0;
          opacity: .7;
          transition: opacity .3s;
        }
        .ct-card.is-expanded .ct-card-icon { opacity: 1; }

        .ct-card-body {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
          flex: 1;
        }
        .ct-card-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--white);
          letter-spacing: .01em;
        }
        .ct-card-value {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ct-card-value a {
          color: var(--gray);
          font-size: 11.5px;
          text-decoration: none;
          transition: color .25s;
        }
        .ct-card.is-expanded .ct-card-value a { color: #e4e7ee; }

        .ct-card-details {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 10px 20px;
          padding-top: 14px;
          border-top: 1px solid rgba(169,184,214,.12);
          animation: ct-detail-reveal .38s cubic-bezier(.2,.75,.25,1) both;
        }
        .ct-card-detail-label {
          grid-column: 1 / -1;
          color: #9da8bd;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .16em;
        }
        .ct-card-details p {
          max-width: 370px;
          margin: 0;
          color: #c1c6d1;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 14px;
          letter-spacing: -.01em;
          line-height: 1.55;
        }
        .ct-card-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 10px;
          border: 1px solid rgba(169,184,214,.17);
          border-radius: 7px;
          color: #e1e5ee;
          font-size: 10px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition: background .2s ease, border-color .2s ease;
        }
        .ct-card-action:hover { border-color: rgba(169,184,214,.38); background: rgba(255,255,255,.04); }

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
        @keyframes ct-pulse {
          0%, 100% { box-shadow: 0 0 8px var(--accent); }
          50% { box-shadow: 0 0 16px var(--accent), 0 0 4px var(--accent); }
        }
        @keyframes ct-haze {
          from { opacity: .65; transform: translateX(-50%) scale(.94); }
          to { opacity: 1; transform: translateX(-50%) scale(1.06); }
        }
        @keyframes ct-detail-reveal {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ══════════ RESPONSIVE ══════════ */
        @media (max-width: 900px) {
          .ct-hero { min-height: auto; padding: 110px 6vw 60px; }
          .ct-grid { grid-template-columns: 1fr; max-width: 560px; gap: 36px; }
          .ct-watermark { font-size: clamp(60px, 18vw, 140px); top: 5%; right: 0; }
          .ct-glow { width: 500px; height: 350px; }
        }
        @media (max-width: 560px) {
          .ct-hero { padding: 100px 5vw 50px; }
          .ct-grid { gap: 28px; }
          .ct-title { font-size: clamp(36px, 12vw, 52px); }
          .ct-form-card { border-radius: 13px; }
          .ct-form-head { padding: 18px 18px 14px; }
          .ct-form-body { padding: 16px 18px 20px; }
          .ct-card { padding: 12px 14px; }
          .ct-bot { width: 27px !important; height: 27px !important; }
          .ct-card.is-expanded {
            height: 236px;
            scale: 1.01;
            will-change: height, scale;
          }
          .ct-card-details { grid-template-columns: 1fr; gap: 10px; }
          .ct-card-action { justify-self: start; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ct-page *, .ct-page *::before, .ct-page *::after {
            animation: none !important;
            transition-duration: .01ms !important;
          }
          .ct-particles { display: none; }
        }
      `}</style>

      <Navbar />

      <section className="ct-hero" ref={heroRef}>
        <div className="ct-focus-backdrop" aria-hidden="true" />
        {/* Background elements */}
        <div className="ct-glow" />
        <span className="ct-watermark">CONTACT</span>
        <ParticleField />

        <div className="ct-grid">
          {/* ─── LEFT ─── */}
          <div className="ct-left">
            <div className="ct-badge">
              <span className="ct-badge-dot" />
              Contact
            </div>

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
                <div
                  key={c.label}
                  className={`ct-card${hoveredCard === i ? " is-expanded" : ""}`}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onFocus={() => setHoveredCard(i)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setHoveredCard(null);
                  }}
                  onClick={(event) => {
                    if (event.target.closest("a, button")) return;
                    setHoveredCard((active) => active === i ? null : i);
                  }}
                  tabIndex={0}
                  aria-expanded={hoveredCard === i}
                >
                  {c.icon}
                  <div className="ct-card-body">
                    <span className="ct-card-label">{c.label}</span>
                    <div className="ct-card-value">
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {c.value}
                      </a>
                    </div>
                  </div>
                  <CopyButton text={c.copyText} />
                  {hoveredCard === i && (
                    <div className="ct-card-details">
                      <span className="ct-card-detail-label">{c.detailLabel}</span>
                      <p>{c.description}</p>
                      <a
                        className="ct-card-action"
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {c.action}<ArrowUpRight size={14} strokeWidth={1.8} />
                      </a>
                    </div>
                  )}
                </div>
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
