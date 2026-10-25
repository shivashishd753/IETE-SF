
"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ArrowUpRight, ChevronDown,} from "lucide-react";

const annualEvents = [
  {
    title: "Vibe-a-thon",
    category: "CREATIVITY",
    description:
      "A next-gen AI-powered hackathon where developers turn creative ideas into full-stack projects using modern development and AI tools.",
    image:
      "/Images/vibeathon.png",
  },
  {
    title: "Nexus",
    category: "DEVELOPMENT",
    description:
      "A contest built for aspiring web creators where creativity meets code. Design innovative web solutions, solve real-world challenges, and showcase your development skills.",
    image:
      "/Images/Nexus.png",
  },
  {
    title: "BGMI Campus Combat",
    category: "GAMING",
    description:
      "An electrifying esports showdown where squads battle for supremacy in BGMI. Team up, sharpen your strategy, outplay your opponents, and fight to become the last squad standing.",
    image:
       "/Images/BGMI.png",
  },
];

const techUdbhavEvents = [
  {
    title: "Robo Soccer",
    category: "ROBOTICS",
    description:
      "Experience football with a robotic twist! Control manually operated robots in thrilling arena matches to score the winning goal.",
    image:
       "/Images/Robosoccer.png",
  },
  {
    title: "Minefield Rescue",
    category: "ROBOTICS",
    description:
      "Navigate a dangerous maze with your robot, overcome hidden obstacles, and rescue hostages in an intense robotics challenge that tests precision and strategy.",
    image:
       "/Images/Minefieldrescue.png",
  },
  {
    title: "Cloak Coding",
    category: "PROGRAMMING",
    description:
      "Code without visual previews or real-time logs in an unconventional programming challenge. Rely on logic, algorithmic thinking, and debugging skills to solve problems when the code runs in the shadows.",
    image:
      "/Images/cloakcoding.png",
  },
  {
    title: "Realm Of Betrayal",
    category: "STRATEGY",
    description:
      "Solve technical riddles, expose a hidden saboteur within your team, and recall intricate patterns under pressure. A gripping test of logic, observation, memory, and trust where every clue matters.",
    image:
       "/Images/RealmOfBetrayal.png",
  },
  {
    title: "Technogram",
    category: "SOCIAL INNOVATION",
    description:
      "A two-level innovation challenge inviting school students to engineer practical solutions for rural communities. Combine sustainable hardware, resilient software, and social empathy to turn technology into meaningful impact.",
    image:
       "/Images/technogram.png",
  },
  {
    title: "Sensorsync",
    category: "ELECTRONICS",
    description:
      "Bridge virtual simulation and real-world engineering in a two-stage prototyping challenge. Design circuits digitally, work with mystery components, and transform your ideas into working solutions under time and resource constraints.",
    image:
      "/Images/sensorsync.png",
  },
];


function EventCard({ event }) {
  return (
    <article className="event-card group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
      {/* Full-card event image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Dark overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050812]/95 via-[#050812]/15 to-[#050812]/20 transition-colors duration-500 group-hover:from-[#050812] group-hover:via-[#050812]/35" />

        {/* Event category: always visible at top */}
        <span className="absolute left-4 top-4 z-10 rounded-full border border-cyan-300/30 bg-[#050812]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-200 backdrop-blur-md">
          {event.category}
        </span>

        {/* Event name and hidden description */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
          <div className="mb-3 h-px w-10 bg-cyan-300 transition-all duration-500 group-hover:w-20" />

          <h3 className="text-2xl font-bold text-white transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-3xl">
            {event.title}
          </h3>

          {/* Description slides up on hover */}
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100">
            <div className="overflow-hidden">
              <p className="translate-y-4 text-sm leading-7 text-slate-300 transition-transform duration-500 ease-out group-hover:translate-y-0">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
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

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function EventSection({ id, eyebrow, title, description, events }) {
  return (
    <section
      id={id}
      className="relative scroll-mt-28 border-t border-white/[0.07] px-5 py-20 sm:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {events.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EventsPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050812] text-white">
      <Navbar />

      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 110px;
        }

        body {
          margin: 0;
          background: #050812;
        }

        .event-card {
          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .event-card:hover {
          transform: translateY(-6px);
          border-color: rgba(34, 211, 238, 0.65);
          box-shadow: 0 16px 45px rgba(8, 145, 178, 0.12);
        }

        @keyframes eventReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .event-reveal {
          animation: eventReveal 0.9s ease-out both;
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

      {/* HERO SECTION */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-b border-white/[0.07]">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(8,100,160,0.23), transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(14,116,144,0.10), transparent 45%)",
          }}
        />

        <div className="event-reveal relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-36 text-center sm:px-8 md:pt-40">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300 sm:text-sm">
            Explore · Learn · Innovate
          </p>

          <h1 className="text-5xl font-black leading-[1.08] tracking-tight sm:text-xl md:text-7xl lg:text-8xl">
            BEYOND
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              BOUNDARIES
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base md:text-lg">
            Discover a world of innovation, where brilliant minds collaborate, challenges spark creativity, and ideas become reality.
          </p>

          <a
            href="#annual-events"
            className="mt-10 inline-flex items-center gap-3 rounded-xl border border-cyan-300/40 bg-cyan-300/[0.08] px-6 py-4 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:bg-cyan-300 hover:text-[#050812]"
          >
            Explore Events
            <ArrowUpRight size={19} />
          </a>
        </div>

        <a
          href="#annual-events"
          aria-label="Scroll to annual events"
          className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 transition hover:text-cyan-300"
        >
          <ChevronDown size={22} className="animate-bounce" />
        </a>
      </section>

      {/* SECTION 1: ANNUAL EVENTS */}
      <EventSection
        id="annual-events"
        eyebrow="Our Signature Events"
        title="Annual Events"
        description="From exciting competitions to unforgettable experiences, our flagship events of IETE-SF bring together technology, creativity, and the spirit of friendly competition."
        events={annualEvents}
      />

      {/* SECTION 2: TECH UDBHAV EVENTS */}
      <EventSection
        id="tech-udbhav"
        eyebrow="Technology Meets Creativity"
        title="Tech Udbhav Events"
        description="Step into the world of innovation with Tech Udbhav, where engineering meets imagination. From robotics and coding to problem-solving and hands-on prototyping, these technical challenges inspire minds to think critically, collaborate, and show their creativity."
        events={techUdbhavEvents}
      />

      <Footer />
    </main>
  );
}
