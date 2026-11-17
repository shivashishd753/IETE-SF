"use client";

import { useRef } from "react";

export default function DomainsHero() {
  const sectionRef = useRef(null);

  /* ---------------- scroll to the carousel section below ---------------- */
  const goDown = () => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="dh-hero"
      style={{
        background: `
          radial-gradient(
            ellipse at 50% 45%,
            rgba(50, 75, 112, 0.17) 0%,
            transparent 65%
          ),
          linear-gradient(
            145deg,
            #10141B 0%,
            #090D14 54%,
            #070A0F 100%
          )
        `,
      }}
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap");

        .dh-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: "Space Grotesk", "Helvetica Neue", Arial, sans-serif;
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
          animation: dh-rise-cta 1s 1.3s forwards cubic-bezier(0.2, 0.7, 0.2, 1);
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
        @keyframes dh-bob {
          0%,
          100% {
            transform: translateY(-3px);
          }
          50% {
            transform: translateY(4px);
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