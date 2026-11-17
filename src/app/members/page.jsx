"use client";

import { Orbitron, Rajdhani, Space_Grotesk } from "next/font/google";
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["400", "500", "600", "700"],
});

// Used only for member names, roles and branches.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA (unchanged)                                                   */
/* ------------------------------------------------------------------ */

const directors = [
  { name: "Adarsh Kumar", role: "Board of Directors", branch: "Electrical Engineering", image: "/Images/Adarsh.jpg", linkedin: "https://www.linkedin.com/in/adarsh-kumar-abb0a3259/" },
  { name: "Kumar Shaswat", role: "Board of Directors", branch: "Electronics and Communication", image: "/Images/sashwat.jpeg", linkedin: "https://www.linkedin.com/in/kumar-shaswat-3a252a35a/" },
  { name: "Simran", role: "Board of Directors", branch: "Electrical Engineering", image: "/Images/simran.jpeg", linkedin: "https://www.linkedin.com/in/simran-bb9338258/" },
  { name: "Shivam Singh", role: "Board of Directors", branch: "Mechanical Engineering", image: "/Images/Shivam1.jpeg", linkedin: "" },
  { name: "Anshika Mishra", role: "Board of Directors", branch: "Metallurgical Engineering", image: "/Images/Anshika.jpeg", linkedin: "https://www.linkedin.com/in/anshika-mishra-2a7641257/" },
  { name: "Sashi Shekhar Singh", role: "Board of Directors", branch: "Electrical Engineering", image: "/Images/Sashi_s.jpeg", linkedin: "https://www.linkedin.com/in/shashi-shkr/" },
  { name: "Anjali Singh", role: "Board of Directors", branch: "Prod. & Ind. Engineering", image: "/Images/Anjali1.jpg", linkedin: "https://www.linkedin.com/in/anjali-singh-58a58b257/" },
  { name: "Aquib Aftab", role: "Board of Directors", branch: "Computer Science Engineering", image: "/Images/Aquib.jpg", linkedin: "https://www.linkedin.com/in/aquib-aftab-65917b252/" },
  { name: "Rudranil Ganguly", role: "Board of Directors", branch: "Chemical Engineering", image: "/Images/Rudra.jpg", linkedin: "https://www.linkedin.com/in/rudranil-ganguly-305411254/" },
  { name: "Kumar Mayank", role: "Board of Directors", branch: "Mechanical Engineering", image: "/Images/Mayank1.jpeg", linkedin: "https://www.linkedin.com/in/kumar-mayank-410660221/" },
  { name: "Rahul Kr. Das", role: "Board of Directors", branch: "Electronics and Communication", image: "/Images/Rahul.jpg", linkedin: "https://www.linkedin.com/404/" },
  { name: "Deepti Kumari", role: "Board of Directors", branch: "Chemical Engineering", image: "/Images/Deepti.jpeg", linkedin: "https://www.linkedin.com/in/deepti-kumari-482049258/" },
  { name: "Puspam Jha", role: "Board of Directors", branch: "Electrical Engineering", image: "/Images/Puspam.png", linkedin: "https://www.linkedin.com/in/puspam-jha/" },
  { name: "Faizan Ahmad", role: "Board of Directors", branch: "Information Technology", image: "/Images/1.jpg", linkedin: "https://www.linkedin.com/in/faizan-ahmad-full-stack/" },
  { name: "Sonali Gorai", role: "Board of Directors", branch: "Electronics and Communication", image: "/Images/sonali.png", linkedin: "https://www.linkedin.com/in/sonali-gorai-b0a631264/" },
];

const OBearers = [
  { name: "Aditya Raj", role: "Chairperson", branch: "Mechanical Engineering", image: "/Images/aditya.jpeg", linkedin: "https://www.linkedin.com/in/aditya-raj-461a31274/" },
  { name: "Amit Gupta", role: "General Secretary", branch: "Electrical Engineering", image: "/Images/amit.jpeg", linkedin: "https://www.linkedin.com/in/amitkrgupta31/" },
  { name: "Rishita Raj", role: "Vice Chairperson", branch: "Information Technology", image: "/Images/rishita.jpg", linkedin: "https://www.linkedin.com/in/rishita-raj-836b13290/" },
  { name: "Ayush Bhagat", role: "Vice Chairperson", branch: "Civil Engineering", image: "/Images/ab.jpg", linkedin: "https://www.linkedin.com/in/ayush-k-bhagat/" },
  { name: "Kashish Kumari", role: "Joint Secretary", branch: "Chemical Engineering", image: "/Images/kashish.jpeg", linkedin: "https://www.linkedin.com/in/kashish-kumari-898771327/" },
  { name: "Roushan Raj", role: "Technical Head", branch: "Computer Science Engineering", image: "/Images/roushan.jpeg", linkedin: "https://www.linkedin.com/in/roushan-raj-cmd007/" },
  { name: "Punam Kumari", role: "Technical Secretary", branch: "Electronics and Communication", image: "/Images/punam.jpeg", linkedin: "https://www.linkedin.com/in/punam-kumari-b17b0a282/" },
  { name: "Neeraj Kachhap", role: "Event Management Head", branch: "Electronics and Communication", image: "/Images/neeraj.jpeg", linkedin: "https://www.linkedin.com/in/neeraj-kachhap-081911303/" },
  { name: "Aakriti Paul", role: "Creative and Design Head", branch: "Chemical Engineering", image: "/Images/aakriti.jpeg", linkedin: "https://www.linkedin.com/in/aakriti-paul-04626a316/" },
  { name: "Sakshee Dubey", role: "Head of Alumni Affairs", branch: "Computer Science Engineering", image: "/Images/sakshee.jpg", linkedin: "https://www.linkedin.com/in/sakshee-dubey-0b3459291/" },
  { name: "Abhishek Prasad", role: "Treasurer and Sponsorship Head", branch: "Mechanical Engineering", image: "/Images/abishek.jpg", linkedin: "https://www.linkedin.com/404/" },
  { name: "Anukriti Kumari", role: "Joint Treasurer", branch: "Electrical Engineering", image: "/Images/Anukriti.jpg", linkedin: "https://www.linkedin.com/in/anukriti-kumari-bb5625290/" },
  { name: "Ankit Yadav", role: "Media and Marketing Head", branch: "Information Technology", image: "/Images/ankit.jpeg", linkedin: "https://www.linkedin.com/in/ankit-yadav-b95a35290/" },
  { name: "Vishnu Singh", role: "Public Relation Officer", branch: "Electrical Engineering", image: "/Images/vishnu.jpg", linkedin: "https://www.linkedin.com/404/" },
  { name: "Warsha Karketta", role: "Public Relation Officer", branch: "Electrical Engineering", image: "/Images/warsha.jpeg", linkedin: "https://www.linkedin.com/in/warsha840/" },
];

const nextGen = [
  { name: "Akash Verma", branch: "Information Technology", image: "/Images/akash1.jpg", linkedin: "https://www.linkedin.com/in/akash-verma-94191b331/" },
  { name: "Anish Gupta", branch: "Chemical Engineering", image: "/Images/anish.jpg", linkedin: "https://www.linkedin.com/in/anish-kumar-gupta-800a3b374/" },
  { name: "Aryan Raj", branch: "Information Technology", image: "/Images/aryan.jpg", linkedin: "https://www.linkedin.com/in/meetaryan/" },
  { name: "Bhumi Agarwal", branch: "Chemical Engineering", image: "/Images/bhumi.jpg", linkedin: "https://www.linkedin.com/in/bhumi-agarwal-b315a1334/" },
  { name: "Gautam Kumar", branch: "Electrical Engineering", image: "/Images/gautam.jpg", linkedin: "https://www.linkedin.com/404/" },
  { name: "Harsh Ranjan", branch: "Electrical Engineering", image: "/Images/ranjan.jpg", linkedin: "https://www.linkedin.com/in/harsh-ranjan-7704a0340/" },
  { name: "Kumar Aditya", branch: "Electrical Engineering", image: "/Images/kaditya.jpeg", linkedin: "https://www.linkedin.com/in/kumar-aditya-b60b2a344/" },
  { name: "Kunal Singh Marwaha", branch: "Electronics and Communication", image: "/Images/kunal.jpeg", linkedin: "https://www.linkedin.com/in/kunal-singh-marwaha/" },
  { name: "Madhu Kumari", branch: "Civil Engineering", image: "/Images/madhu.jpg", linkedin: "https://www.linkedin.com/in/madhu-mishra-971644335/" },
  { name: "Madhulika Kumari", branch: "Electronics and Communication", image: "/Images/madhulika.jpg", linkedin: "https://www.linkedin.com/in/madhulika-kumari-70abb1345/" },
  { name: "Mithi Jha", branch: "Electrical Engineering", image: "/Images/mithi.jpg", linkedin: "https://www.linkedin.com/in/mithi-jha-699b71288/" },
  { name: "Palak Kumari Agarwal", branch: "Electronics and Communication", image: "/Images/palak.jpeg", linkedin: "https://www.linkedin.com/in/palak-kumari-agarwal-ab9229317/" },
  { name: "Rimisha Kumari", branch: "Information Technology", image: "/Images/rimisha.png", linkedin: "https://www.linkedin.com/in/rimisha-kumari-67a2ba334/" },
  { name: "Shashank Gupta", branch: "Mechanical Engineering", image: "/Images/shashank.jpg", linkedin: "https://www.linkedin.com/in/shashank-gupta-230489338/" },
];

// Kept for later (the 2k25 batch was commented out in the original page).
// eslint-disable-next-line no-unused-vars
const nextGen2 = [
  { name: "Angel Priya", branch: "Metallurgical Engineering", image: "/Images/angel.png", linkedin: "https://www.linkedin.com/in/angel-p-a86374372/" },
  { name: "Ankit Kumar", branch: "Electrical Engineering", image: "/Images/ankit.png", linkedin: "https://www.linkedin.com/in/ankit-kumar-863260231/" },
  { name: "Ayushman Parashar", branch: "Chemical Engineering", image: "/Images/ayushman.png", linkedin: "https://www.linkedin.com/in/ayushman-parashar-615524385/" },
  { name: "Ayush Mishra", branch: "Electrical Engineering", image: "/Images/ayush.png", linkedin: "https://www.linkedin.com/in/ayush-mishra250306/" },
  { name: "Chandrakant Mandal", branch: "Chemical Engineering", image: "/Images/chandru.png", linkedin: "https://www.linkedin.com/in/chandrakant-mandal-a09316280/" },
  { name: "Chandan Kr Soni", branch: "Mechanical Engineering", image: "/Images/chandan.png", linkedin: "https://www.linkedin.com/in/chandan-soni-703261386/" },
  { name: "Khushi Pandey", branch: "Chemical Engineering", image: "/Images/khushi.png", linkedin: "https://www.linkedin.com/in/khushi-pandey-4792b3398/" },
  { name: "Kriti Kumari", branch: "Electrical Engineering", image: "/Images/kriti.png", linkedin: "https://www.linkedin.com/in/kriti-kumari-4a59bb3b8/" },
  { name: "Prachi Priya", branch: "Information Technology", image: "/Images/prachi.png", linkedin: "https://www.linkedin.com/in/prachi-priya-383123395/" },
  { name: "Rishav Karketta", branch: "Electrical Engineering", image: "/Images/rishav.png", linkedin: "https://www.linkedin.com/in/rishav-kerketta-95ab79350/" },
  { name: "Rishi Kunal", branch: "Mechanical Engineering", image: "/Images/rishi.png", linkedin: "https://www.linkedin.com/in/rishi-kunal/" },
  { name: "Siddharth Mishra", branch: "Cyber Security", image: "/Images/sid.png", linkedin: "https://www.linkedin.com/in/siddharth-mishra-a5486b317/" },
  { name: "Shivashish Dwivedi", branch: "Electronics and Communication", image: "/Images/shiva.png", linkedin: "https://www.linkedin.com/in/shivashish-dwivedi-028723321/" },
  { name: "Shiwani Shah", branch: "Electronics and Communication", image: "/Images/shiwani.png", linkedin: "https://www.linkedin.com/in/shiwani-shah-b31964384/" },
  { name: "Soumya Sinha", branch: "Information Technology", image: "/Images/soumya.jpg", linkedin: "https://www.linkedin.com/in/-soumya-sinha/" },
];

/* Links that point to the LinkedIn 404 page are treated as "no link". */
const hasLink = (m) => Boolean(m.linkedin) && !m.linkedin.includes("/404");

/* ------------------------------------------------------------------ */
/*  HERO BACKGROUND (unchanged)                                        */
/* ------------------------------------------------------------------ */

function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const section = canvas.parentElement;
    if (!section) return;

    let animationFrame;
    let width = 0;
    let height = 0;
    let dots = [];
    let time = 0;

    const cursor = { x: -1000, y: -1000, active: false };

    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(22, Math.floor((width * height) / 20000));

      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.35 + 0.2,
        driftX: (Math.random() - 0.5) * 0.12,
        driftY: (Math.random() - 0.5) * 0.12,
      }));
    };

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect();
      cursor.x = event.clientX - rect.left;
      cursor.y = event.clientY - rect.top;
      cursor.active = true;
    };

    const handlePointerLeave = () => {
      cursor.active = false;
    };

    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      const cursorRadius = Math.min(width, height) * 0.24;

      if (cursor.active) {
        const glow = ctx.createRadialGradient(
          cursor.x, cursor.y, 0,
          cursor.x, cursor.y, cursorRadius
        );

        glow.addColorStop(0, "rgba(75, 177, 224, 0.16)");
        glow.addColorStop(0.5, "rgba(75, 177, 224, 0.06)");
        glow.addColorStop(1, "rgba(75, 177, 224, 0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      const maxDistance = Math.min(width, height) * 0.32;

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];

        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance >= maxDistance) continue;

          const proximity = 1 - distance / maxDistance;
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;

          let opacity = proximity * 0.12;
          let color = "105, 157, 184";

          if (cursor.active) {
            const cursorDistance = Math.hypot(
              midX - cursor.x,
              midY - cursor.y
            );
            const influence = Math.max(
              0,
              1 - cursorDistance / cursorRadius
            );

            opacity += influence * 0.38;

            if (influence > 0.05) color = "103, 205, 245";
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${color}, ${Math.min(opacity, 0.65)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      dots.forEach((dot) => {
        dot.x += dot.driftX;
        dot.y += dot.driftY;

        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;

        const pulse = (Math.sin(time * dot.speed + dot.phase) + 1) / 2;

        let opacity = 0.18 + pulse * 0.22;
        let radius = dot.radius;
        let color = "133, 183, 207";

        if (cursor.active) {
          const distance = Math.hypot(
            dot.x - cursor.x,
            dot.y - cursor.y
          );
          const influence = Math.max(
            0,
            1 - distance / cursorRadius
          );

          opacity += influence * 0.45;
          radius += influence * 1.1;

          if (influence > 0.1) color = "145, 224, 255";
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${Math.min(opacity, 0.95)})`;
        ctx.fill();
      });

      if (cursor.active) {
        const nearbyDots = dots
          .map((dot) => ({
            dot,
            distance: Math.hypot(
              dot.x - cursor.x,
              dot.y - cursor.y
            ),
          }))
          .filter(({ distance }) => distance < cursorRadius)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 7);

        nearbyDots.forEach(({ dot, distance }) => {
          const opacity = (1 - distance / cursorRadius) * 0.42;

          ctx.beginPath();
          ctx.moveTo(cursor.x, cursor.y);
          ctx.lineTo(dot.x, dot.y);
          ctx.strokeStyle = `rgba(103, 205, 245, ${opacity})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        });
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(section);

    window.addEventListener("resize", resizeCanvas);
    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="network-background-canvas"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION HEADING (unchanged)                                        */
/* ------------------------------------------------------------------ */

function SectionHeading({ eyebrow, title, description }) {
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");

  useEffect(() => {
    const element = headingRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (!entry.isIntersecting) {
          setTypedTitle("");
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    setTypedTitle("");

    const typingTimer = setInterval(() => {
      index++;
      setTypedTitle(title.slice(0, index));

      if (index >= title.length) {
        clearInterval(typingTimer);
      }
    }, 55);

    return () => clearInterval(typingTimer);
  }, [isVisible, title]);

  return (
    <div
      ref={headingRef}
      className="section-heading mb-10 text-center"
    >
      {eyebrow && (
        <p
          className={`section-subtitle mb-3 text-xs font-bold uppercase tracking-[0.32em] text-cyan-300 ${
            isVisible ? "section-fade-in" : "section-hidden"
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2 className="section-title text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        <span>{typedTitle}</span>
        <span className="typing-cursor">|</span>
        <span className="text-cyan-300">.</span>
      </h2>

      {description && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base ${
            isVisible ? "section-fade-in description-delay" : "section-hidden"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARED PIECES                                                      */
/* ------------------------------------------------------------------ */


function Portrait({ member, className = "", eager = false }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  // Catches images that failed before React hydrated (onError never fires for those).
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        className={`portrait-fallback flex items-center justify-center ${className}`}
      >
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={member.image}
      alt={member.name}
      loading={eager ? "eager" : "lazy"}
      draggable={false}
      onError={() => setFailed(true)}
      className={`object-cover object-center ${className}`}
    />
  );
}

function LinkedInButton({ member, compact = false }) {
  if (!hasLink(member)) return null;
  return (
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${member.name}'s LinkedIn profile`}
      className={compact ? "icon-link" : "cta-link"}
    >
      {!compact && <span>LinkedIn</span>}
      <ArrowUpRight size={compact ? 16 : 15} />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  THE DRUM — used for every team                                     */
/*  Each team sits on a 3D rotating ring that fits in one screen.      */
/*  Scrolling up/down moves through the page as normal; scrolling      */
/*  sideways (trackpad / shift + wheel), dragging, swiping, the arrow  */
/*  keys or the arrow buttons turn the ring. Whoever faces you is lit  */
/*  up and their details appear underneath automatically.             */
/* ------------------------------------------------------------------ */

const mod = (a, n) => ((a % n) + n) % n;
const PX_PER_MEMBER = 140; // sideways scroll distance that turns one person

function MemberDrum({ id, title, description, members, showRole = false }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const drumRef = useRef(null);
  const cardRefs = useRef([]);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const loopRef = useRef(null);
  const activeRef = useRef(-1);
  const dragRef = useRef(null);
  const draggedRef = useRef(false);
  const snapTimer = useRef(0);
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState({ w: 1280, h: 460 });

  const n = members.length;
  const step = n > 0 ? 360 / n : 0;
  const tanStep = Math.tan(Math.PI / Math.max(3, n));
  const isSmall = stage.w < 640;
  const byHeight = (stage.h - 56) / 1.32;
  const byWidth = (2 * stage.w * (isSmall ? 1.3 : 0.64) * tanStep) / 1.08;
  const cardW = Math.round(
    Math.max(120, Math.min(340, byHeight, byWidth, stage.w * (isSmall ? 0.62 : 0.58)))
  );
  const cardH = Math.round(cardW * 1.32);
  const radius =
    n >= 3
      ? Math.round((cardW / 2 / tanStep) * 1.08)
      : Math.round(cardW * 0.9);
  const perspective = Math.round(Math.max(1100, radius * 2.6));
  cardRefs.current.length = n;

  // Measure the space the ring is allowed to use so everything fits on screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const apply = useCallback(
    (pos) => {
      const drum = drumRef.current;
      if (!drum || n === 0) return;
      const angle = pos * step;
      // The tilt pushes the front card down by radius·sin(6°); lift it back to centre.
      const lift = radius * Math.sin((6 * Math.PI) / 180);
      drum.style.transform = `translateY(${-lift}px) translateZ(${-radius}px) rotateX(-6deg) rotateY(${-angle}deg)`;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rel = ((((i * step - angle) % 360) + 540) % 360) - 180;
        const facing = Math.cos((rel * Math.PI) / 180);
        card.style.setProperty("--focus", (Math.max(0, facing) ** 3).toFixed(3));
      });

      const index = mod(Math.round(pos), n);
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    },
    [n, step, radius]
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const tick = () => {
      const diff = targetRef.current - posRef.current;
      posRef.current =
        reduceMotion || Math.abs(diff) < 0.0005
          ? targetRef.current
          : posRef.current + diff * 0.13;
      apply(posRef.current);
      rafRef.current =
        posRef.current === targetRef.current ? 0 : requestAnimationFrame(tick);
    };
    loopRef.current = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };
    activeRef.current = -1;
    apply(posRef.current);
    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [apply]);

  const goTo = useCallback((t) => {
    targetRef.current = t;
    loopRef.current?.();
  }, []);

  const shift = (by) => goTo(Math.round(targetRef.current) + by);

  const jumpTo = (i) => {
    const cur = Math.round(targetRef.current);
    let d = mod(i - cur, n);
    if (d > n / 2) d -= n;
    goTo(cur + d);
  };

  // Sideways scrolling turns the ring; up/down scrolling is left to the page.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || n === 0) return;
    const onWheel = (e) => {
      let dx = e.deltaX;
      if (e.shiftKey && Math.abs(dx) < 1) dx = e.deltaY;
      const sideways = e.shiftKey || Math.abs(dx) > Math.abs(e.deltaY);
      if (!sideways || Math.abs(dx) < 0.5) return;
      e.preventDefault();
      const px = e.deltaMode === 1 ? dx * 32 : e.deltaMode === 2 ? dx * 400 : dx;
      goTo(targetRef.current + px / PX_PER_MEMBER);
      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(
        () => goTo(Math.round(targetRef.current)),
        140
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(snapTimer.current);
    };
  }, [n, goTo]);

  // Drag (mouse) or swipe (touch) sideways to turn the ring.
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    draggedRef.current = false;
    dragRef.current = {
      x: e.clientX,
      start: targetRef.current,
      moved: false,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
    };
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      draggedRef.current = true;
      stageRef.current?.setPointerCapture?.(e.pointerId);
    }
    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    d.v = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.v;
    d.lastX = e.clientX;
    d.lastT = now;
    goTo(d.start - dx / (cardW * 0.9));
  };

  const onPointerUp = () => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d || !d.moved) return;
    const fling = Math.max(-3, Math.min(3, (-d.v * 160) / (cardW * 0.9)));
    goTo(Math.round(targetRef.current + fling));
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      shift(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      shift(-1);
    }
  };

  if (n === 0) return null;
  const currentIndex = Math.min(active, n - 1);
  const current = members[currentIndex];

  return (
    <section
      ref={sectionRef}
      id={id}
      className="drum-section border-t border-white/[0.07]"
    >
      <div aria-hidden="true" className="starfield" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading title={title} description={description} />
      </div>

      <div
        ref={stageRef}
        className="drum-stage"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${title}: use the left and right arrow keys to turn`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ perspective: `${perspective}px` }}
      >
        <div
          ref={drumRef}
          className="drum"
          style={{ width: cardW, height: cardH }}
        >
          <div
            aria-hidden="true"
            className="drum-floor"
            style={{
              width: radius * 2 + cardW,
              height: radius * 2 + cardW,
              marginLeft: -(radius + cardW / 2),
              marginTop: -(radius + cardW / 2),
              transform: `translateY(${cardH / 2 + 22}px) rotateX(90deg)`,
            }}
          />

          {members.map((member, i) => (
            <div
              key={member.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => {
                if (!draggedRef.current) jumpTo(i);
              }}
              className={`drum-card ${i === currentIndex ? "is-active" : ""}`}
              style={{
                width: cardW,
                height: cardH,
                transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
              }}
            >
              <div className="drum-face">
                <Portrait member={member} className="drum-photo h-full w-full" eager />
                <div className="drum-face-shade" />
                <p className="drum-caption">{member.name}</p>
              </div>
              <div aria-hidden="true" className="drum-back" />
            </div>
          ))}
        </div>
      </div>

      <div className="drum-info relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
        <div className="drum-info-row">
          <button
            type="button"
            className="drum-arrow"
            aria-label="Previous member"
            onClick={() => shift(-1)}
          >
            <ChevronLeft size={22} />
          </button>

          <div key={current.name} className="drum-info-inner" aria-live="polite">
            {showRole && current.role && (
              <p className="drum-role">{current.role}</p>
            )}
            <h3 className="drum-name">{current.name}</h3>
            <div className="drum-meta">
              <span className="drum-branch">{current.branch}</span>
              <LinkedInButton member={current} compact />
            </div>
          </div>

          <button
            type="button"
            className="drum-arrow"
            aria-label="Next member"
            onClick={() => shift(1)}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <p className="drum-hint">
          <span className="hint-fine">Scroll sideways, drag or use the arrows to spin</span>
          <span className="hint-touch">Swipe sideways to spin</span>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function MembersPage() {
  return (
    <main
      className={`${orbitron.variable} ${rajdhani.variable} ${spaceGrotesk.variable} members-page relative isolate min-h-screen overflow-x-clip bg-[#050812] text-white`}
    >
      <Navbar />

      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 0;
        }

        body {
          margin: 0;
          background: #050812;
        }

        .font-display {
          font-family: var(--font-rajdhani), sans-serif;
        }

        .section-title {
          font-family: var(--font-orbitron), sans-serif;
          font-weight: 700;
          letter-spacing: 0.025em;
          text-transform: uppercase;
          text-shadow: 0 0 24px rgba(34, 211, 238, 0.12);
        }

        .section-subtitle,
        .section-heading p {
          font-family: var(--font-rajdhani), sans-serif;
        }

        .section-hidden {
          opacity: 0;
          transform: translateY(18px);
        }

        .section-fade-in {
          animation: sectionFadeIn 0.7s ease-out both;
        }

        .description-delay {
          animation-delay: 0.15s;
        }

        .typing-cursor {
          display: inline-block;
          margin-left: 3px;
          color: #67e8f9;
          animation: cursorBlink 0.7s steps(2, start) infinite;
        }

        @keyframes sectionFadeIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cursorBlink {
          to {
            visibility: hidden;
          }
        }

        .network-background-canvas {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-reveal {
          animation: heroReveal 0.9s ease-out both;
        }

        .hero-delay-1 {
          animation-delay: 0.15s;
        }

        .hero-delay-2 {
          animation-delay: 0.3s;
        }

        /* ---------- navy theme for everything below the hero ---------- */
        .members-page {
          --navy-950: #050b22;
          --navy-900: #071233;
          --navy-850: #0a173f;
          --navy-800: #0f1f4f;
          --navy-line: rgba(148, 190, 255, 0.12);
          --cyan: #67e8f9;
          --cyan-strong: #22d3ee;
          --nav-offset: 100px;
          --font-member: var(--font-space-grotesk), "Space Grotesk", sans-serif;
        }

        @media (max-width: 767px) {
          .members-page {
            --nav-offset: 84px;
          }
        }

        .portrait-fallback {
          background:
            radial-gradient(circle at 30% 25%, rgba(103, 232, 249, 0.35), transparent 55%),
            linear-gradient(160deg, #13286b, #081236);
          color: #cffafe;
          font-family: var(--font-orbitron), sans-serif;
          font-weight: 700;
          letter-spacing: 0.08em;
          font-size: clamp(0.8rem, 2.4vw, 1.6rem);
        }

        .starfield {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(1px 1px at 12px 24px, rgba(255, 255, 255, 0.55), transparent 60%),
            radial-gradient(1px 1px at 90px 140px, rgba(186, 230, 253, 0.5), transparent 60%),
            radial-gradient(1.5px 1.5px at 170px 70px, rgba(103, 232, 249, 0.55), transparent 60%),
            radial-gradient(1px 1px at 230px 210px, rgba(255, 255, 255, 0.4), transparent 60%);
          background-size: 260px 260px;
          animation: twinkle 6s ease-in-out infinite;
          opacity: 0.55;
        }

        @keyframes twinkle {
          50% {
            opacity: 0.25;
          }
        }

        .cta-link {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          gap: 0.5rem;
          border-radius: 999px;
          border: 1px solid rgba(103, 232, 249, 0.4);
          background: rgba(34, 211, 238, 0.06);
          padding: 0.65rem 1.15rem;
          font-family: var(--font-rajdhani), sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #cffafe;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s;
        }

        .cta-link:hover {
          background: var(--cyan);
          color: var(--navy-950);
          box-shadow: 0 0 30px rgba(103, 232, 249, 0.45);
        }

        .icon-link {
          display: inline-flex;
          height: 40px;
          width: 40px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(148, 190, 255, 0.25);
          background: transparent;
          color: #fff;
          cursor: pointer;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }

        .icon-link:hover {
          background: var(--cyan);
          border-color: var(--cyan);
          color: var(--navy-950);
        }

        .cta-link:focus-visible,
        .icon-link:focus-visible,
        .drum-stage:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 3px;
        }

        /* ---------- THE DRUM (every team) ---------- */
        .drum-section {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100svh;
          min-height: 600px;
          overflow: hidden;
          padding: var(--nav-offset) 0 clamp(14px, 2.6vh, 30px);
          background:
            radial-gradient(ellipse at 50% 55%, rgba(8, 100, 160, 0.2), transparent 55%),
            radial-gradient(ellipse at 20% 85%, rgba(14, 116, 144, 0.09), transparent 45%),
            #050812;
        }

        .drum-section .section-heading {
          margin-bottom: 0;
        }

        .drum-section .section-title {
          font-size: clamp(1.5rem, 3.4vw, 2.6rem);
        }

        .drum-section .section-heading p:not(.section-subtitle) {
          margin-top: 0.35rem;
        }

        .drum-stage {
          position: relative;
          z-index: 5;
          display: flex;
          flex: 1 1 0;
          min-height: 0;
          align-items: center;
          justify-content: center;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          outline: none;
        }

        .drum-stage:active {
          cursor: grabbing;
        }

        .drum-stage:focus-visible .drum-card.is-active .drum-face {
          outline: 2px solid var(--cyan);
          outline-offset: 6px;
        }

        .drum {
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .drum-card {
          position: absolute;
          inset: 0;
          cursor: pointer;
          transform-style: preserve-3d;
        }

        .drum-face,
        .drum-back {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 20px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .drum-face {
          border: 1px solid rgba(148, 190, 255, 0.18);
          background: var(--navy-800);
          box-shadow: 0 20px 60px rgba(2, 6, 23, 0.6);
          transition: border-color 0.4s, box-shadow 0.4s;
        }

        .drum-photo {
          pointer-events: none;
          filter: grayscale(calc(1 - var(--focus, 1))) brightness(calc(0.4 + 0.6 * var(--focus, 1)));
        }

        .drum-face-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5, 11, 34, 0.92), rgba(5, 11, 34, 0.1) 42%, transparent 65%);
        }

        .drum-caption {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 12px;
          margin: 0;
          font-family: var(--font-member);
          font-size: clamp(15px, 1.5vw, 19px);
          font-weight: 700;
          line-height: 1.1;
          color: #fff;
          text-shadow: 0 2px 12px rgba(2, 6, 23, 0.9);
          opacity: calc(var(--focus, 1) * 0.9);
        }

        .drum-card.is-active .drum-caption {
          opacity: 0;
          transition: opacity 0.3s;
        }

        .drum-card.is-active .drum-face {
          border-color: rgba(103, 232, 249, 0.85);
          box-shadow:
            0 0 0 1px rgba(103, 232, 249, 0.4),
            0 0 60px rgba(34, 211, 238, 0.4),
            0 30px 80px rgba(2, 6, 23, 0.7);
        }

        .drum-back {
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotateY(180deg);
          border: 1px solid rgba(148, 190, 255, 0.12);
          background: linear-gradient(160deg, rgba(14, 40, 80, 0.5), rgba(5, 8, 18, 0.6));
        }

        .drum-floor {
          position: absolute;
          left: 50%;
          top: 50%;
          pointer-events: none;
          border-radius: 50%;
          border: 1px dashed rgba(103, 232, 249, 0.4);
          background: radial-gradient(circle, rgba(34, 211, 238, 0.18), rgba(30, 64, 175, 0.1) 45%, transparent 70%);
        }

        .drum-floor::after {
          content: "";
          position: absolute;
          inset: 14%;
          border-radius: 50%;
          border: 1px solid rgba(148, 190, 255, 0.14);
        }

        .drum-info {
          flex: none;
          padding-top: clamp(6px, 1.6vh, 16px);
        }

        .drum-info-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: clamp(10px, 3vw, 32px);
        }

        .drum-info-inner {
          text-align: center;
          animation: infoIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        @keyframes infoIn {
          from {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(5px);
          }
          to {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }

        .drum-role {
          display: inline-flex;
          max-width: 100%;
          align-items: center;
          gap: 10px;
          border-radius: 999px;
          border: 1px solid rgba(103, 232, 249, 0.35);
          background: rgba(34, 211, 238, 0.08);
          padding: 5px 16px;
          font-family: var(--font-member);
          font-size: clamp(0.8rem, 1.3vw, 0.95rem);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #cffafe;
        }

        .drum-name {
          margin-top: 0.4rem;
          font-family: var(--font-member);
          font-size: clamp(1.9rem, 4.2vw, 3.3rem);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.01em;
          color: transparent;
          background: linear-gradient(180deg, #ffffff 35%, #a5f3fc);
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 0 22px rgba(34, 211, 238, 0.35));
        }

        .drum-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 0.35rem;
        }

        .drum-branch {
          font-family: var(--font-member);
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #cbd5e1;
        }

        .drum-meta .icon-link {
          height: 34px;
          width: 34px;
          border-color: rgba(103, 232, 249, 0.45);
          color: var(--cyan);
        }

        .drum-arrow {
          display: inline-flex;
          height: 48px;
          width: 48px;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(103, 232, 249, 0.4);
          background: rgba(5, 11, 34, 0.6);
          color: var(--cyan);
          cursor: pointer;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s;
        }

        .drum-arrow:hover {
          background: var(--cyan);
          color: var(--navy-950);
          box-shadow: 0 0 26px rgba(103, 232, 249, 0.5);
        }

        @media (max-width: 639px) {
          .drum-arrow {
            height: 40px;
            width: 40px;
          }
        }

        .drum-hint {
          margin-top: 0.3rem;
          text-align: center;
          font-family: var(--font-rajdhani), sans-serif;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #64748b;
        }

        .hint-touch {
          display: none;
        }

        @media (hover: none) {
          .hint-fine {
            display: none;
          }
          .hint-touch {
            display: inline;
          }
        }

        .drum-arrow:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .starfield {
            animation: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* HERO (unchanged) */}
      <section
        id="members-home"
        className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
      >
        <NetworkBackground />

        {/* Optional soft background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 48%, rgba(8,100,160,0.20), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(14,116,144,0.09), transparent 45%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-32 text-center sm:px-8 md:pt-36">
          <h1 className="hero-reveal hero-delay-1 text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            OUR
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              MEMBERS
            </span>
          </h1>

          <p className="hero-reveal hero-delay-2 mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base md:text-lg">
            Welcome to our Exciting realms of technology, coding, engineering
            and robotics. Discover, learn and collaborate with like minded
            individuals, pushing the boundries of innovation.
          </p>
        </div>

        {/* Keep the scroll arrow relative to the whole hero section */}
        <a
          href="#directors"
          aria-label="Scroll to board of directors"
          className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 transition hover:text-cyan-300"
        >
          <ChevronDown className="animate-bounce" size={20} />
        </a>
      </section>

      {/* Every team is shown on the same 3D drum */}
      <MemberDrum
        id="directors"
        title="Board of Directors"
        description="Architects of the Vision"
        members={directors}
      />

      <MemberDrum
        id="core-team"
        title="Office Bearers"
        description="Leading the vision of IETE"
        members={OBearers}
        showRole
      />

      <MemberDrum
        id="next-gen"
        title="Next Gen"
        description="The future of innovation"
        members={nextGen}
      />

      <Footer />
    </main>
  );
}