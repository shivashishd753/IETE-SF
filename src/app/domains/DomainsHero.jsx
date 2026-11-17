"use client";

import { useEffect, useRef } from "react";

const WORDS = [
  "Competitive Programming",
  "IoT & Robotics",
  "AI & ML",
  "Video Editing",
  "Graphic Designing",
  "Web Development",
];

const SPACING = 36; // distance between dots
const RADIUS = 190; // cursor influence radius

export default function DomainsHero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  /* ---------------- animated background: living dot-field ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots = [];
    let floaters = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999, active: false, tx: -9999, ty: -9999 };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = section.clientWidth;
      h = section.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const ox = (w - (cols - 1) * SPACING) / 2;
      const oy = (h - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ bx: ox + c * SPACING, by: oy + r * SPACING });
        }
      }

      floaters = WORDS.map((text, i) => ({
        text,
        x: Math.random() * w,
        y: h * (0.12 + (i / WORDS.length) * 0.8),
        speed: 8 + Math.random() * 10,
        size: 12 + Math.random() * 4,
      }));
    };
    build();

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      if (!mouse.active) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(build);
    ro.observe(section);

    let t0 = performance.now();
    const draw = (now) => {
      const t = (now - t0) / 1000;

      // when idle, a virtual pointer wanders so the field never feels dead
      if (!mouse.active) {
        mouse.tx = w * (0.5 + 0.32 * Math.sin(t * 0.45));
        mouse.ty = h * (0.5 + 0.28 * Math.sin(t * 0.31 + 1.3));
      }
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      ctx.clearRect(0, 0, w, h);

      // floating domain names, drifting slowly behind the dots
      ctx.textBaseline = "middle";
      floaters.forEach((f) => {
        f.x += f.speed * 0.016;
        ctx.font = `400 ${f.size}px "Space Grotesk", Arial, sans-serif`;
        const tw = ctx.measureText(f.text).width;
        if (f.x > w + 20) f.x = -tw - 20;
        ctx.fillStyle = "rgba(120,185,240,0.13)";
        ctx.fillText(f.text.toUpperCase(), f.x, f.y);
      });

      // dots
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const wave =
          Math.sin(d.bx * 0.012 + t * 0.9) * Math.cos(d.by * 0.012 + t * 0.7);
        let x = d.bx;
        let y = d.by + wave * 3;

        const dx = d.bx - mouse.x;
        const dy = d.by - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let near = 0;
        if (dist < RADIUS) {
          near = 1 - dist / RADIUS;
          const push = near * near * 34;
          x += (dx / (dist || 1)) * push;
          y += (dy / (dist || 1)) * push;
        }

        const alpha = 0.16 + near * 0.8 + (wave + 1) * 0.04;
        const size = 1 + near * 2.2;
        ctx.fillStyle = `rgba(110,200,245,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /* ---------------- scroll to the carousel section below ---------------- */
  const goDown = () => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="dh-hero">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap");

        .dh-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          background: radial-gradient(
              ellipse at 50% 38%,
              #001532 0%,
              #000814 45%,
              #060d1b 100%
            );
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: "Space Grotesk", "Helvetica Neue", Arial, sans-serif;
        }

        .dh-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .dh-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            rgba(7, 15, 30, 0.7) 0%,
            rgba(7, 15, 30, 0.3) 45%,
            rgba(7, 15, 30, 0) 75%
          );
        }

        .dh-content {
          position: relative;
          z-index: 2;
          padding: 0 24px;
          pointer-events: none;
        }

        .dh-eyebrow {
          display: inline-block;
          font-size: 13px;
          letter-spacing: 0.4em;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 28px;
          opacity: 0;
          animation: dh-rise 0.9s 0.1s forwards cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .dh-title {
          margin: 0;
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.04em;
          font-size: clamp(44px, 6vw, 150px);
          text-transform: uppercase;
        }

        .dh-line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.06em;
        }

        .dh-line > span {
          display: block;
          transform: translateY(110%);
          animation: dh-slide 1.1s forwards cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .dh-line:nth-child(1) > span {
          animation-delay: 0.25s;
        }
        .dh-line:nth-child(2) > span {
          animation-delay: 0.45s;
          color: transparent;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #d9f6ff 40%,
            #5fd8f5 80%,
            #3fcbee 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dh-caption {
          margin: 34px auto 0;
          max-width: 520px;
          font-size: clamp(14px, 1.3vw, 17px);
          line-height: 1.7;
          color: rgba(170, 190, 218, 0.85);
          opacity: 0;
          animation: dh-rise 1s 0.9s forwards cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .dh-cta {
          position: absolute;
          z-index: 3;
          left: 50%;
          bottom: 38px;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          background: none;
          border: 0;
          color: #fff;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          letter-spacing: 0.35em;
          opacity: 0;
          animation: dh-rise 1s 1.3s forwards cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .dh-cta-ring {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 1px solid rgba(95, 216, 245, 0.5);
          display: grid;
          place-items: center;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }

        .dh-cta:hover .dh-cta-ring {
          background: #fff;
          border-color: #fff;
          transform: scale(1.08);
        }

        .dh-cta:hover svg {
          stroke: #060d1b;
        }

        .dh-cta svg {
          width: 18px;
          height: 18px;
          stroke: #fff;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation: dh-bob 1.6s infinite ease-in-out;
          transition: stroke 0.3s;
        }

        @keyframes dh-slide {
          to {
            transform: translateY(0);
          }
        }
        @keyframes dh-rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dh-bob {
          0%,
          100% {
            transform: translateY(-3px);
          }
          50% {
            transform: translateY(4px);
          }
        }

        /* keep the button centred while its rise animation runs */
        .dh-cta {
          animation-name: dh-rise-cta;
        }
        @keyframes dh-rise-cta {
          from {
            opacity: 0;
            transform: translate(-50%, 18px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dh-line > span,
          .dh-eyebrow,
          .dh-caption,
          .dh-cta {
            animation-duration: 0.01s;
            animation-delay: 0s;
          }
          .dh-cta svg {
            animation: none;
          }
        }
      `}</style>

      <canvas ref={canvasRef} className="dh-canvas" />
      <div className="dh-vignette" />

      <div className="dh-content">
        <span className="dh-eyebrow">/ WHAT WE DO</span>
        <h1 className="dh-title">
          <span className="dh-line">
            <span>Our Domains</span>
          </span>
          <span className="dh-line">
            <span>Your Curiosity</span>
          </span>
        </h1>
        <p className="dh-caption">
          Six worlds of making, thinking and building. Pick the one that pulls
          at you and start exploring.
        </p>
      </div>

      <button className="dh-cta" onClick={goDown} aria-label="Explore domains">
        EXPLORE
        <span className="dh-cta-ring">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </span>
      </button>
    </section>
  );
}
