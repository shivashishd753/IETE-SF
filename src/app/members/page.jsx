
"use client";

import { useEffect, useState , useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  Cpu,
  Palette,
  Radio,
  Search,
  Sparkles,
  Users,
} from "lucide-react";


const directors = [
  {
    name: "Adarsh Kumar",
    role: "Board of Directors",
    branch: "Electrical Engineering",
    image:
      "/Images/Adarsh.jpg",
    linkedin: "https://www.linkedin.com/in/adarsh-kumar-abb0a3259/",
  },
  {
    name: "Kumar Shaswat",
    role: "Board of Directors",
    branch: "Electronics and Communication",
    image:
      "/Images/sashwat.jpeg",
    linkedin: "https://www.linkedin.com/in/kumar-shaswat-3a252a35a/",
  },
  {
    name: "Simran",
    role: "Board of Directors",
    branch: "Electrical Engineering",
    image:
      "/Images/simran.jpeg",
    linkedin: "https://www.linkedin.com/in/simran-bb9338258/",
  },
  {
    name: "Shivam Singh",
    role: "Board of Directors",
    branch: "Mechanical Engineering",
    image:
      "/Images/Shivam1.jpeg",
    linkedin: "",
  },
  {
    name: "Anshika Mishra",
    role: "Board of Directors",
    branch: "Metallurgical Engineering",
    image:
      "/Images/Anshika.jpeg",
    linkedin: "https://www.linkedin.com/in/anshika-mishra-2a7641257/",
  },
  {
    name: "Sashi Shekhar Singh",
    role: "Board of Directors",
    branch: "Electrical Engineering",
    image:
      "/Images/Sashi_s.jpeg",
    linkedin: "https://www.linkedin.com/in/shashi-shkr/",
  },
  {
    name: "Anjali Singh",
    role: "Board of Directors",
    branch: "Prod. & Ind. Engineering",
    image:
      "/Images/Anjali1.jpg",
    linkedin: "https://www.linkedin.com/in/anjali-singh-58a58b257/",
  },
  {
    name: "Aquib Aftab",
    role: "Board of Directors",
    branch: "Computer Science Engineering",
    image:
      "/Images/Aquib.jpg",
    linkedin: "https://www.linkedin.com/in/aquib-aftab-65917b252/",
  },
  {
    name: "Rudranil Ganguly",
    role: "Board of Directors",
    branch: "Chemical Engineering",
    image:
      "/Images/Rudra.jpg",
    linkedin: "https://www.linkedin.com/in/rudranil-ganguly-305411254/",
  },
  {
    name: "Kumar Mayank",
    role: "Board of Directors",
    branch: "Mechanical Engineering",
    image:
      "/Images/Mayank1.jpeg",
    linkedin: "https://www.linkedin.com/in/kumar-mayank-410660221/",
  },
  {
    name: "Rahul Kr. Das",
    role: "Board of Directors",
    branch: "Electronics and Communication",
    image:
      "/Images/Rahul.jpg",
    linkedin: "https://www.linkedin.com/404/",
  },
  {
    name: "Deepti Kumari",
    role: "Board of Directors",
    branch: "Chemical Engineering",
    image:
      "/Images/Deepti.jpeg",
    linkedin: "https://www.linkedin.com/in/deepti-kumari-482049258/",
  },
  {
    name: "Puspam Jha",
    role: "Board of Directors",
    branch: "Electrical Engineering",
    image:
      "/Images/Puspam.png",
    linkedin: "https://www.linkedin.com/in/puspam-jha/",
  },
  {
    name: "Faizan Ahmad",
    role: "Board of Directors",
    branch: "Information Technology",
    image:
      "Images/1.jpg",
    linkedin: "https://www.linkedin.com/in/faizan-ahmad-full-stack/",
  },
  {
    name: "Sonali Gorai",
    role: "Board of Directors",
    branch: "Electronics and Communication",
    image:
      "/Images/sonali.png",
    linkedin: "https://www.linkedin.com/in/sonali-gorai-b0a631264/",
  }
];

const OBearers = [
  {
    name: "Aditya Raj",
    role: "Chairperson",
    branch: "Mechanical Engineering",
    image:
      "/Images/aditya.jpeg",
    linkedin: "https://www.linkedin.com/in/aditya-raj-461a31274/",
  },
  {
    name: "Amit Gupta",
    role: "General Secretary",
    branch: "Electrical Engineering",
    image:
      "/Images/amit.jpeg",
    linkedin: "https://www.linkedin.com/in/amitkrgupta31/",
  },
  {
    name: "Rishita Raj",
    role: "Vice Chairperson",
    branch: "Information Technology",
    image:
      "/Images/rishita.jpg",
    linkedin: "https://www.linkedin.com/in/rishita-raj-836b13290/",
  },
  {
    name: "Ayush Bhagat",
    role: "Vice Chairperson",
    branch: "Civil Engineering",
    image:
      "/Images/ab.jpg",
    linkedin: "https://www.linkedin.com/in/ayush-k-bhagat/",
  },
  {
    name: "Kashish Kumari",
    role: "Joint Secretary",
    branch: "Chemical Engineering",
    image:
      "/Images/kashish.jpeg",
    linkedin: "https://www.linkedin.com/in/kashish-kumari-898771327/",
  },
  {
    name: "Roushan Raj",
    role: "Technical Head",
    branch: "Computer Science Engineering",
    image:
      "/Images/roushan.jpeg",
    linkedin: "https://www.linkedin.com/in/roushan-raj-cmd007/",
  },
  {
    name: "Punam Kumari",
    role: "Technical Secretary",
    branch: "Electronics and Communication",
    image:
      "/Images/punam.jpeg",
    linkedin: "https://www.linkedin.com/in/punam-kumari-b17b0a282/",
  },
  {
    name: "Neeraj Kachhap",
    role: "Event Management Head",
    branch: "Electronics and Communication",
    image:
      "/Images/neeraj.jpeg",
    linkedin: "https://www.linkedin.com/in/neeraj-kachhap-081911303/",
  },
  {
    name: "Aakriti Paul",
    role: "Creative and Design Head",
    branch: "Chemical Engineering",
    image:
      "/Images/aakriti.jpeg",
    linkedin: "https://www.linkedin.com/in/aakriti-paul-04626a316/",
  },
  {
    name: "Sakshee Dubey",
    role: "Head of Alumni Affairs",
    branch: "Computer Science Engineering",
    image:
      "/Images/sakshee.jpg",
    linkedin: "https://www.linkedin.com/in/sakshee-dubey-0b3459291/",
  },
  {
    name: "Abhishek Prasad",
    role: "Treasurer and Sponsorship Head",
    branch: "Mechanical Engineering",
    image:
      "/Images/abishek.jpg",
    linkedin: "https://www.linkedin.com/404/",
  },
  {
    name: "Anukriti Kumari",
    role: "Joint Treasurer",
    branch: "Electrical Engineering",
    image:
      "/Images/Anukriti.jpg",
    linkedin: "https://www.linkedin.com/in/anukriti-kumari-bb5625290/",
  },
  {
    name: "Ankit Yadav",
    role: "Media and Marketing Head",
    branch: "Information Technology",
    image:
      "/Images/ankit.jpeg",
    linkedin: "https://www.linkedin.com/in/ankit-yadav-b95a35290/",
  },
  {
    name: "Vishnu Singh",
    role: "Public Relation Officer",
    branch: "Electrical Engineering",
    image:
      "/Images/vishnu.jpg",
    linkedin: "https://www.linkedin.com/404/",
  },
  {
    name: "Warsha Karketta",
    role: "Public Relation Officer",
    branch: "Electrical Engineering",
    image:
      "/Images/warsha.jpeg",
    linkedin: "https://www.linkedin.com/in/warsha840/",
  }
];

const nextGen = [
  {
    name: "Akash Verma",
    branch: "Information Technology",
    image:
      "/Images/akash1.jpg",
    linkedin: "https://www.linkedin.com/in/akash-verma-94191b331/",
  },
  {
    name: "Anish Gupta",
    branch: "Chemical Engineering",
    image:
      "/Images/anish.jpg",
    linkedin: "https://www.linkedin.com/in/anish-kumar-gupta-800a3b374/",
  },
  {
    name: "Aryan Raj",
    branch: "Information Technology",
    image:
      "/Images/aryan.jpg",
    linkedin: "https://www.linkedin.com/in/meetaryan/",
  },
  {
    name: "Bhumi Agarwal",
    branch: "Chemical Engineering",
    image:
      "/Images/bhumi.jpg",
    linkedin: "https://www.linkedin.com/in/bhumi-agarwal-b315a1334/",
  },
  {
    name: "Gautam Kumar",
    branch: "Electrical Engineering",
    image:
      "/Images/gautam.jpg",
    linkedin: "https://www.linkedin.com/404/",
  },
  {
    name: "Harsh Ranjan",
    branch: "Electrical Engineering",
    image:
      "/Images/ranjan.jpg",
    linkedin: "https://www.linkedin.com/in/harsh-ranjan-7704a0340/",
  },
  {
    name: "Kumar Aditya",
    branch: "Electrical Engineering",
    image:
      "/Images/kaditya.jpeg",
    linkedin: "https://www.linkedin.com/in/kumar-aditya-b60b2a344/",
  },
  {
    name: "Kunal Singh Marwaha",
    branch: "Electronics and Communication",
    image:
      "/Images/kunal.jpeg",
    linkedin: "https://www.linkedin.com/in/kunal-singh-marwaha/",
  },
  {
    name: "Madhu Kumari",
    branch: "Civil Engineering",
    image:
      "/Images/madhu.jpg",
    linkedin: "https://www.linkedin.com/in/madhu-mishra-971644335/",
  },
  {
    name: "Madhulika Kumari",
    branch: "Electronics and Communication",
    image:
      "/Images/madhulika.jpg",
    linkedin: "https://www.linkedin.com/in/madhulika-kumari-70abb1345/",
  },
  {
    name: "Mithi Jha",
    branch: "Electrical Engineering",
    image:
      "/Images/mithi.jpg",
    linkedin: "https://www.linkedin.com/in/mithi-jha-699b71288/",
  },
  {
    name: "Palak Kumari Agarwal",
    branch: "Electronics and Communication",
    image:
      "/Images/palak.jpeg",
    linkedin: "https://www.linkedin.com/in/palak-kumari-agarwal-ab9229317/",
  },
  {
    name: "Rimisha Kumari",
    branch: "Information Technology",
    image:
      "/Images/rimisha.png",
    linkedin: "https://www.linkedin.com/in/rimisha-kumari-67a2ba334/",
  },
  {
    name: "Shashank Gupta",
    branch: "Mechanical Engineering",
    image:
      "/Images/shashank.jpg",
    linkedin: "https://www.linkedin.com/in/shashank-gupta-230489338/",
  }
]

function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Listen on the hero section, not the canvas
    const section = canvas.parentElement;
    if (!section) return;

    let animationFrame;
    let width = 0;
    let height = 0;
    let dots = [];
    let time = 0;

    const cursor = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(
        22,
        Math.floor((width * height) / 20000)
      );

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
      const rect = canvas.getBoundingClientRect();

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

      // Soft blue light around the cursor
      if (cursor.active) {
        const glow = ctx.createRadialGradient(
          cursor.x,
          cursor.y,
          0,
          cursor.x,
          cursor.y,
          cursorRadius
        );

        glow.addColorStop(0, "rgba(75, 177, 224, 0.16)");
        glow.addColorStop(0.5, "rgba(75, 177, 224, 0.06)");
        glow.addColorStop(1, "rgba(75, 177, 224, 0)");

        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // Existing network connections
      const maxDistance = Math.min(width, height) * 0.32;

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];

        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

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

            if (influence > 0.05) {
              color = "103, 205, 245";
            }
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${color}, ${Math.min(opacity, 0.65)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Slowly moving dots that brighten near the cursor
      dots.forEach((dot) => {
        dot.x += dot.driftX;
        dot.y += dot.driftY;

        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;
        if (dot.y < 0) dot.y = height;
        if (dot.y > height) dot.y = 0;

        const pulse =
          (Math.sin(time * dot.speed + dot.phase) + 1) / 2;

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

          if (influence > 0.1) {
            color = "145, 224, 255";
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${Math.min(opacity, 0.95)})`;
        ctx.fill();
      });

      // Extra temporary connections around the cursor
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
          const opacity =
            (1 - distance / cursorRadius) * 0.42;

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

    window.addEventListener("resize", resizeCanvas);
    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
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

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-cyan-300">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
        <span className="text-cyan-300">.</span>
      </h2>

      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function MemberCard({ member }) {
  return (
    <article className="member-card group relative overflow-hidden rounded-2xl border border-white/15 bg-[#0B1220]">
      <div className="relative aspect-[4/4.5] overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/15 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-cyan-300/30 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-200 backdrop-blur-md">
          {member.role}
        </span>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${member.name}'s LinkedIn profile`}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:border-cyan-300 hover:bg-cyan-300 hover:text-black"
        >
          <ArrowUpRight size={20} />
        </a>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="mb-3 h-px w-10 bg-cyan-300 transition-all duration-300 group-hover:w-20" />

          <h3 className="text-xl font-bold text-white sm:text-2xl">
            {member.name}
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-300 sm:text-sm">
            {member.branch}
          </p>
        </div>
      </div>

      {member.domain && (
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-4 sm:px-5">
          <span className="text-xs text-slate-300 sm:text-sm">
            {member.domain}
          </span>
          <ArrowUpRight
            size={17}
            className="shrink-0 text-cyan-300 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
      )}
    </article>
  );
}

export default function MembersPage() {
  const [search, setSearch] = useState("");

  const filteredDirectors = directors.filter((member) =>
    `${member.name} ${member.branch}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredOBearers = OBearers.filter((member) =>
    `${member.name} ${member.branch} ${member.domain}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

    const filterednextGen = nextGen.filter((member) =>
    `${member.name} ${member.branch} ${member.domain}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className=" relative isolate overflow-hidden min-h-screen overflow-x-hidden bg-[#050812] text-white">
      <Navbar />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 110px;
        }

        body {
          margin: 0;
          background: #050812;
        }

        .network-glow {
          background:
            radial-gradient(
              ellipse at 50% 48%,
              rgba(8, 100, 160, 0.2),
              transparent 55%
            ),
            radial-gradient(
              ellipse at 20% 80%,
              rgba(14, 116, 144, 0.09),
              transparent 45%
            );
        }

        .network-node {
          opacity: 0.45;
          animation: nodePulse 3.5s ease-in-out infinite;
        }

        @keyframes nodePulse {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 1;
          }
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

        .hero-delay-3 {
          animation-delay: 0.45s;
        }

        .member-card {
          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .member-card:hover {
          transform: translateY(-6px);
          border-color: rgba(34, 211, 238, 0.7);
          box-shadow: 0 16px 45px rgba(8, 145, 178, 0.12);
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

      {/* FULL-SCREEN INTRO */}
      <section
        id="members-home"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      >
        <NetworkBackground />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-32 text-center sm:px-8 md:pt-36">
          

          <h1 className="hero-reveal hero-delay-1 text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            OUR
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              MEMBERS
            </span>
            
          </h1>

          <p className="hero-reveal hero-delay-2 mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base md:text-lg">
            Welcome to our Exciting realms of technology, coding, engineering and robotics. Discover, learn and collaborate with like minded individuals, pushing the boundries of innovation.
          </p>

         

          
<a
  href="#directors"
  aria-label="Scroll to board of directors"
  className="absolute left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 transition hover:text-cyan-300"
  style={{ bottom: "8px" }}
>
  
  <ChevronDown className="animate-bounce" size={20} />
</a>

        </div>
      </section>

      {/* MEMBERS DIRECTORY */}
      <section
        id="directors"
        className="relative scroll-mt-24 border-t border-white/[0.07] px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Board of Directors"
            description="Architects of the Vision"
          />


          {filteredDirectors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filteredDirectors.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-slate-400">
              No directors match your search.
            </p>
          )}
        </div>
      </section>

      {/* Office Bearers */}
      <section
        id="core-team"
        className="relative scroll-mt-24 border-t border-white/[0.07] bg-[#080D19] px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Office Bearers"
            description="Leading the vision of IETE"
          />

          {filteredOBearers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filteredOBearers.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-slate-400">
              No core team members match your search.
            </p>
          )}
        </div>
      </section>

      {/* Next Gen */}
      <section
        id="core-team"
        className="relative scroll-mt-24 border-t border-white/[0.07] bg-[#080D19] px-5 py-20 sm:px-8 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Next Gen"
            description="The future of innovation"
          />

          {filterednextGen.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filterednextGen.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-slate-400">
              No core team members match your search.
            </p>
          )}
        </div>
      </section>

      <Footer/>
      
    </main>
  );
}
