 "use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, MoveDown } from "lucide-react";
import "./domains.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

gsap.registerPlugin(ScrollTrigger);

const domains = [
  {
    number: "01",
    name: "Competitive",
    secondLine: "Programming",
    kicker: "THE ART OF LOGIC",
    description:
      "Turn complex problems into elegant solutions. Build algorithmic thinking, sharpen problem-solving skills, and learn to perform under pressure.",
    category: "LOGIC / ALGORITHMS / PRECISION",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=2400&q=90",
    alt: "Programming code on a computer screen",
    theme: "cp",
    display: "01 — THINK",
  },
  {
    number: "02",
    name: "IoT &",
    secondLine: "Robotics",
    kicker: "IDEAS THAT MOVE",
    description:
      "Bring the digital and physical worlds together through sensors, embedded systems, automation, and intelligent machines.",
    category: "ROBOTICS / HARDWARE / AUTOMATION",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=2400&q=90",
    alt: "Humanoid robot in a futuristic setting",
    theme: "robotics",
    display: "02 — MAKE",
  },
  {
    number: "03",
    name: "AI",
    secondLine: "& ML",
    kicker: "BEYOND THE OBVIOUS",
    description:
      "Explore machine learning, intelligent systems, and data-driven ideas that help technology learn, adapt, and create.",
    category: "AI / MACHINE LEARNING / DATA",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2400&q=90",
    alt: "Abstract artificial intelligence visual",
    theme: "ai",
    display: "03 — IMAGINE",
  },
  {
    number: "04",
    name: "Video",
    secondLine: "Editing",
    kicker: "EVERY FRAME HAS A FEELING",
    description:
      "Shape raw footage into powerful stories using rhythm, transitions, colour, sound, and motion that make every frame matter.",
    category: "MOTION / STORYTELLING / FILM",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2400&q=90",
    alt: "Cinema screen in a dark movie theatre",
    theme: "video",
    display: "04 — CREATE",
  },
  {
    number: "05",
    name: "Graphic",
    secondLine: "Designing",
    kicker: "MAKE IDEAS VISIBLE",
    description:
      "Combine typography, colour, composition, and visual storytelling to build identities and designs that communicate at a glance.",
    category: "VISUALS / BRANDING / COMPOSITION",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=2400&q=90",
    alt: "Creative design workspace with visual inspiration",
    theme: "graphic",
    display: "05 — DESIGN",
  },
  {
    number: "06",
    name: "Web",
    secondLine: "Development",
    kicker: "DESIGN THE NEXT INTERNET",
    description:
      "Turn ideas into interactive digital experiences with thoughtful interfaces, modern web technologies, and purposeful engineering.",
    category: "DESIGN / CODE / INTERACTION",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2400&q=90",
    alt: "Developer workspace with code on a screen",
    theme: "web",
    display: "06 — BUILD",
  },
];

export default function DomainsPage() {
  const rootRef = useRef(null);
  const introRef = useRef(null);
  const progressRef = useRef(null);
  const countRef = useRef(null);
  const introCanvasRef = useRef(null);

  const handleIntroPointerMove = (event) => {
    if (!introRef.current) return;
    const rect = introRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    introRef.current.style.setProperty("--pointer-x", `${x}%`);
    introRef.current.style.setProperty("--pointer-y", `${y}%`);
  };

  useLayoutEffect(() => {
    const section = introRef.current;
    const canvas = introCanvasRef.current;
    if (!section || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    let pointer = { x: -1000, y: -1000 };
    let targetPointer = { x: -1000, y: -1000 };
    let isPointerInside = false;
    // Respect reduced-motion preferences without breaking the canvas renderer.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.15);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMove = (event) => {
      const rect = section.getBoundingClientRect();
      targetPointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      isPointerInside = true;
    };

    const handleLeave = () => {
      isPointerInside = false;
      targetPointer = { x: -1000, y: -1000 };
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      time += reduceMotion ? 0 : 0.006;
      pointer.x += (targetPointer.x - pointer.x) * 0.20;
      pointer.y += (targetPointer.y - pointer.y) * 0.20;

      // Oversized orbital field enters from the right edge, like a cropped planet.
      // The center remains visible while the outer orbit paths extend beyond the viewport.
      const compact = width < 700;
      const cx = width * (compact ? 0.92 : 0.91);
      const cy = height * (compact ? 0.42 : 0.48);
      const rx = width * (compact ? 0.57 : 0.47);
      const ry = height * (compact ? 0.43 : 0.48);
      const pointerActive = isPointerInside && pointer.x > -500;
      const dx = pointer.x - cx;
      const dy = pointer.y - cy;
      const cursorDistance = Math.hypot(dx, dy);
      const cursorInfluence = pointerActive ? Math.max(0, 1 - cursorDistance / (Math.max(rx, ry) * 1.65)) : 0;

      // Soft central glow.
      // Keep the orbital field nearly dormant until the cursor approaches it.
      if (pointerActive && cursorDistance < Math.max(rx, ry) * 1.15) {
        const reveal = Math.max(0, 1 - cursorDistance / (Math.max(rx, ry) * 1.15));
        const coreGlow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 210);
        coreGlow.addColorStop(0, `rgba(27, 104, 205, ${reveal * 0.075})`);
        coreGlow.addColorStop(1, "rgba(20, 89, 190, 0)");
        context.fillStyle = coreGlow;
        context.fillRect(pointer.x - 210, pointer.y - 210, 420, 420);
      }

      // Three elegant elliptical paths, slowly revolving in different directions.
      const orbits = [
        { rx: rx, ry: ry * 0.46, rotation: -0.32, speed: 0.22, phase: 0.1, alpha: 0.16 },
        { rx: rx * 0.78, ry: ry * 0.92, rotation: 0.68, speed: -0.16, phase: 2.1, alpha: 0.12 },
        { rx: rx * 0.98, ry: ry * 0.68, rotation: -0.85, speed: 0.12, phase: 4.2, alpha: 0.10 },
      ];

      orbits.forEach((orbit, index) => {
        context.save();
        context.translate(cx, cy);
        context.rotate(orbit.rotation);
        context.beginPath();
        context.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
        context.strokeStyle = `rgba(68, 155, 255, ${orbit.alpha + cursorInfluence * 0.10})`;
        context.lineWidth = 1;
        context.stroke();
        context.restore();

        const count = index === 0 ? 5 : 4;
        for (let i = 0; i < count; i += 1) {
          const angle = time * orbit.speed + orbit.phase + (Math.PI * 2 * i) / count;
          const cosR = Math.cos(angle) * orbit.rx;
          const sinR = Math.sin(angle) * orbit.ry;
          const px = cx + cosR * Math.cos(orbit.rotation) - sinR * Math.sin(orbit.rotation);
          const py = cy + cosR * Math.sin(orbit.rotation) + sinR * Math.cos(orbit.rotation);
          const distanceToCursor = pointerActive ? Math.hypot(px - pointer.x, py - pointer.y) : 9999;
          const nearCursor = pointerActive ? Math.max(0, 1 - distanceToCursor / 165) : 0;
          const pulse = 1 + Math.sin(time * 2 + i * 1.7) * 0.16;
          const radius = (3.1 + nearCursor * 3.2) * pulse;

          const nodeGlow = context.createRadialGradient(px, py, 0, px, py, radius * 4.5);
          nodeGlow.addColorStop(0, `rgba(100, 225, 255, ${0.035 + nearCursor * 0.85})`);
          nodeGlow.addColorStop(1, "rgba(40, 145, 255, 0)");
          context.fillStyle = nodeGlow;
          context.beginPath();
          context.arc(px, py, radius * 4.5, 0, Math.PI * 2);
          context.fill();
          context.beginPath();
          context.arc(px, py, radius, 0, Math.PI * 2);
          context.fillStyle = nearCursor > 0.1 ? "#b7f5ff" : "rgba(82, 158, 225, 0.88)";
          context.fill();
        }
      });

      // The central orb: understated, luminous, and consistent with the site palette.
      const coreRadius = Math.max(compact ? 23 : 25, Math.min(compact ? 38 : 54, width * (compact ? 0.065 : 0.038)));
      const core = context.createRadialGradient(cx - coreRadius * 0.35, cy - coreRadius * 0.4, 1, cx, cy, coreRadius * 1.6);
      core.addColorStop(0, "#37658c");
      core.addColorStop(0.25, "#174a80");
      core.addColorStop(0.68, "#0b2b59");
      core.addColorStop(1, "rgba(5, 20, 48, 0.05)");
      context.beginPath();
      context.arc(cx, cy, coreRadius * (1 + Math.sin(time * 1.5) * 0.035), 0, Math.PI * 2);
      context.fillStyle = core;
      context.fill();
      context.strokeStyle = "rgba(83, 145, 198, 0.34)";
      context.lineWidth = 1;
      context.stroke();

      // Custom cursor: a small luminous circle, shown while the pointer is inside the intro.
      if (pointerActive) {
        context.save();
        context.beginPath();
        context.arc(pointer.x, pointer.y, 5, 0, Math.PI * 2);
        context.fillStyle = "rgba(150, 225, 255, 0.95)";
        context.fill();
        context.beginPath();
        context.arc(pointer.x, pointer.y, 10, 0, Math.PI * 2);
        context.strokeStyle = "rgba(74, 188, 255, 0.42)";
        context.lineWidth = 1;
        context.stroke();
        context.restore();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    section.addEventListener("pointermove", handleMove);
    section.addEventListener("pointerleave", handleLeave);
    window.addEventListener("resize", resizeCanvas);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      section.removeEventListener("pointermove", handleMove);
      section.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".film-panel", root);

      panels.forEach((panel, index) => {
        const image = panel.querySelector(".film-image");
        const shade = panel.querySelector(".film-shade");
        const eyebrow = panel.querySelector(".film-kicker");
        const titleLines = panel.querySelectorAll(".film-title-line");
        const description = panel.querySelector(".film-description");
        const meta = panel.querySelector(".film-meta");
        const number = panel.querySelector(".film-number");
        const nextHint = panel.querySelector(".film-next");

        gsap.set(image, { scale: 1.18 });
        // Keep all text readable even before the scroll animation catches up.
        gsap.set([eyebrow, titleLines, description, meta, number], {
          opacity: 1,
          y: 22,
        });
        gsap.set(shade, { opacity: 0.45 });

        const enter = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 78%",
            end: "top 12%",
            scrub: 0.8,
          },
        });

        enter
          .to(image, { scale: 1, ease: "none" }, 0)
          .to(shade, { opacity: 0.7, ease: "none" }, 0)
          .to(eyebrow, { y: 0, ease: "none" }, 0.08)
          .to(
            titleLines,
            { y: 0, stagger: 0.12, ease: "none" },
            0.12
          )
          .to(description, { y: 0, ease: "none" }, 0.35)
          .to(meta, { y: 0, ease: "none" }, 0.42)
          .to(number, { y: 0, ease: "none" }, 0.25);

        gsap.to(image, {
          scale: 1.12,
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        gsap.to(panel.querySelector(".film-copy"), {
          yPercent: -8,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "center center",
            end: "bottom top",
            scrub: 0.7,
          },
        });

        if (nextHint && index === 0) {
          gsap.to(nextHint, {
            y: 10,
            opacity: 0.35,
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: "sine.inOut",
          });
        }
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }

          const current = Math.min(
            domains.length,
            Math.max(1, Math.floor(self.progress * domains.length) + 1)
          );

          if (countRef.current) {
            countRef.current.textContent = String(current).padStart(2, "0");
          }
        },
      });

      gsap.fromTo(
        ".film-intro-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }
      );

      gsap.fromTo(
        ".film-intro-title",
        { clipPath: "inset(0 0 100% 0)", y: 30 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.15,
          ease: "power4.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".film-intro-bottom",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8 }
      );

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);


  return (
    <main className="film-experience" ref={rootRef}>
      <Navbar />

      <div className="film-progress" aria-hidden="true">
        <div className="film-progress-track">
          <div className="film-progress-fill" ref={progressRef} />
        </div>
        <div className="film-progress-label">
          <span ref={countRef}>01</span>
          <span>/ 06</span>
        </div>
      </div>

      <section
        ref={introRef}
        className="film-intro film-intro-interactive"
        onPointerMove={handleIntroPointerMove}
      >
        <canvas ref={introCanvasRef} className="intro-cursor-canvas" aria-hidden="true" />
        <div className="intro-grid" aria-hidden="true" />
        <div className="intro-orb intro-orb-one" aria-hidden="true" />
        <div className="intro-orb intro-orb-two" aria-hidden="true" />
        <div className="intro-cursor-glow" aria-hidden="true" />

        

        <div className="film-intro-content">
          

          <h1 className="film-intro-title intro-reveal intro-reveal-two">
            YOUR CURIOSITY.
            <br />
            <em>OUR DOMAINS</em>
          </h1>

          <p className="film-intro-subtitle intro-reveal intro-reveal-three">
           
            <br />
           
            <br className="intro-desktop-break" />
           
          </p>

          <a
            href="#domain-0"
            className="intro-explore intro-reveal intro-reveal-four"
          >
            <span>EXPLORE DOMAINS</span>
            <span className="intro-explore-arrow">↓</span>
          </a>
        </div>

        <div className="film-intro-bottom">
          <span className="intro-scroll-label">
            <span className="intro-scroll-line" />
           
          </span>
          <span className="intro-bottom-caption">
            TECH / CREATIVITY / IMPACT
          </span>
          <MoveDown size={17} />
        </div>
      </section>

      {domains.map((domain, index) => (
        <section
          key={domain.number}
          className={`film-panel film-${domain.theme}`}
          id={index === 0 ? "domain-0" : undefined}
          aria-label={`${domain.name} ${domain.secondLine}`}
        >
          <div className="film-image-wrap">
            <div
              className="film-image"
              role="img"
              aria-label={domain.alt}
              style={{ backgroundImage: `url("${domain.image}")` }}
            />
          </div>
          <div className="film-shade" />

          <div className="film-panel-top">
           
            <span>{domain.display}</span>
          </div>

          <div className="film-copy">
            <p className="film-kicker">
              <span className="film-kicker-line" />
              {domain.kicker}
            </p>

            <div className="film-number">{domain.number}</div>

            <h2 className="film-title">
              <span className="film-title-line">{domain.name}</span>
              <span className="film-title-line film-title-second">
                {domain.secondLine}<i>.</i>
              </span>
            </h2>

            <p className="film-description">{domain.description}</p>

            <div className="film-meta">
              <span>{domain.category}</span>
              <span></span>
            </div>
          </div>

          {index === 0 && (
            <div className="film-next">
              <span>KEEP GOING</span>
              <ArrowDownRight size={19} />
            </div>
          )}

          <div className="film-panel-bottom">
            <span>EXPLORE WHAT MOVES YOU</span>
            <span>{domain.number} / 06</span>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  );
}
