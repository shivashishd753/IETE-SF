
// "use client";

// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import { ArrowUpRight, ChevronDown,} from "lucide-react";

// const annualEvents = [
//   {
//     title: "Vibe-a-thon",
//     category: "CREATIVITY",
//     description:
//       "A next-gen AI-powered hackathon where developers turn creative ideas into full-stack projects using modern development and AI tools.",
//     image:
//       "/Images/vibeathon.png",
//   },
//   {
//     title: "Nexus",
//     category: "DEVELOPMENT",
//     description:
//       "A contest built for aspiring web creators where creativity meets code. Design innovative web solutions, solve real-world challenges, and showcase your development skills.",
//     image:
//       "/Images/Nexus.png",
//   },
//   {
//     title: "BGMI Campus Combat",
//     category: "GAMING",
//     description:
//       "An electrifying esports showdown where squads battle for supremacy in BGMI. Team up, sharpen your strategy, outplay your opponents, and fight to become the last squad standing.",
//     image:
//        "/Images/BGMI.png",
//   },
// ];

// const techUdbhavEvents = [
//   {
//     title: "Robo Soccer",
//     category: "ROBOTICS",
//     description:
//       "Experience football with a robotic twist! Control manually operated robots in thrilling arena matches to score the winning goal.",
//     image:
//        "/Images/Robosoccer.png",
//   },
//   {
//     title: "Minefield Rescue",
//     category: "ROBOTICS",
//     description:
//       "Navigate a dangerous maze with your robot, overcome hidden obstacles, and rescue hostages in an intense robotics challenge that tests precision and strategy.",
//     image:
//        "/Images/Minefieldrescue.png",
//   },
//   {
//     title: "Cloak Coding",
//     category: "PROGRAMMING",
//     description:
//       "Code without visual previews or real-time logs in an unconventional programming challenge. Rely on logic, algorithmic thinking, and debugging skills to solve problems when the code runs in the shadows.",
//     image:
//       "/Images/cloakcoding.png",
//   },
//   {
//     title: "Realm Of Betrayal",
//     category: "STRATEGY",
//     description:
//       "Solve technical riddles, expose a hidden saboteur within your team, and recall intricate patterns under pressure. A gripping test of logic, observation, memory, and trust where every clue matters.",
//     image:
//        "/Images/RealmOfBetrayal.png",
//   },
//   {
//     title: "Technogram",
//     category: "SOCIAL INNOVATION",
//     description:
//       "A two-level innovation challenge inviting school students to engineer practical solutions for rural communities. Combine sustainable hardware, resilient software, and social empathy to turn technology into meaningful impact.",
//     image:
//        "/Images/technogram.png",
//   },
//   {
//     title: "Sensorsync",
//     category: "ELECTRONICS",
//     description:
//       "Bridge virtual simulation and real-world engineering in a two-stage prototyping challenge. Design circuits digitally, work with mystery components, and transform your ideas into working solutions under time and resource constraints.",
//     image:
//       "/Images/sensorsync.png",
//   },
// ];


// function EventCard({ event }) {
//   return (
//     <article className="event-card group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
//       {/* Full-card event image */}
//       <div className="relative aspect-[4/5] overflow-hidden">
//         <img
//           src={event.image}
//           alt={event.title}
//           loading="lazy"
//           className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//         />

//         {/* Dark overlay for readable text */}
//         <div className="absolute inset-0 bg-gradient-to-t from-[#050812]/95 via-[#050812]/15 to-[#050812]/20 transition-colors duration-500 group-hover:from-[#050812] group-hover:via-[#050812]/35" />

//         {/* Event category: always visible at top */}
//         <span className="absolute left-4 top-4 z-10 rounded-full border border-cyan-300/30 bg-[#050812]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-200 backdrop-blur-md">
//           {event.category}
//         </span>

//         {/* Event name and hidden description */}
//         <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
//           <div className="mb-3 h-px w-10 bg-cyan-300 transition-all duration-500 group-hover:w-20" />

//           <h3 className="text-2xl font-bold text-white transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-3xl">
//             {event.title}
//           </h3>

//           {/* Description slides up on hover */}
//           <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100">
//             <div className="overflow-hidden">
//               <p className="translate-y-4 text-sm leading-7 text-slate-300 transition-transform duration-500 ease-out group-hover:translate-y-0">
//                 {event.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }


// function SectionHeading({ eyebrow, title, description }) {
//   return (
//     <div className="mb-10 text-center">
//       <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-cyan-300">
//         {eyebrow}
//       </p>

//       <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
//         {title}
//         <span className="text-cyan-300">.</span>
//       </h2>

//       <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
//         {description}
//       </p>
//     </div>
//   );
// }

// function EventSection({ id, eyebrow, title, description, events }) {
//   return (
//     <section
//       id={id}
//       className="relative scroll-mt-28 border-t border-white/[0.07] px-5 py-20 sm:px-8 md:py-24"
//     >
//       <div className="mx-auto max-w-7xl">
//         <SectionHeading
//           eyebrow={eyebrow}
//           title={title}
//           description={description}
//         />

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
//           {events.map((event) => (
//             <EventCard key={event.title} event={event} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default function EventsPage() {
//   return (
//     <main className="min-h-screen overflow-x-clip bg-[#050812] text-white">
//       <Navbar />

//       <style>{`
//         html {
//           scroll-behavior: smooth;
//           scroll-padding-top: 110px;
//         }

//         body {
//           margin: 0;
//           background: #050812;
//         }

//         .event-card {
//           transition:
//             transform 0.35s ease,
//             border-color 0.35s ease,
//             box-shadow 0.35s ease;
//         }

//         .event-card:hover {
//           transform: translateY(-6px);
//           border-color: rgba(34, 211, 238, 0.65);
//           box-shadow: 0 16px 45px rgba(8, 145, 178, 0.12);
//         }

//         @keyframes eventReveal {
//           from {
//             opacity: 0;
//             transform: translateY(22px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .event-reveal {
//           animation: eventReveal 0.9s ease-out both;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           *,
//           *::before,
//           *::after {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             scroll-behavior: auto !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>

//       {/* HERO SECTION */}
//       <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-b border-white/[0.07]">
//         {/* Background glow */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(ellipse at 50% 45%, rgba(8,100,160,0.23), transparent 55%), radial-gradient(ellipse at 15% 80%, rgba(14,116,144,0.10), transparent 45%)",
//           }}
//         />

//         <div className="event-reveal relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-36 text-center sm:px-8 md:pt-40">
//           <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300 sm:text-sm">
//             Explore · Learn · Innovate
//           </p>

//           <h1 className="text-5xl font-black leading-[1.08] tracking-tight sm:text-xl md:text-7xl lg:text-8xl">
//             BEYOND
//             <br />
//             <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
//               BOUNDARIES
//             </span>
//           </h1>

//           <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base md:text-lg">
//             Discover a world of innovation, where brilliant minds collaborate, challenges spark creativity, and ideas become reality.
//           </p>

//           <a
//             href="#annual-events"
//             className="mt-10 inline-flex items-center gap-3 rounded-xl border border-cyan-300/40 bg-cyan-300/[0.08] px-6 py-4 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:bg-cyan-300 hover:text-[#050812]"
//           >
//             Explore Events
//             <ArrowUpRight size={19} />
//           </a>
//         </div>

//         <a
//           href="#annual-events"
//           aria-label="Scroll to annual events"
//           className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 transition hover:text-cyan-300"
//         >
//           <ChevronDown size={22} className="animate-bounce" />
//         </a>
//       </section>

//       {/* SECTION 1: ANNUAL EVENTS */}
//       <EventSection
//         id="annual-events"
//         eyebrow="Our Signature Events"
//         title="Annual Events"
//         description="From exciting competitions to unforgettable experiences, our flagship events of IETE-SF bring together technology, creativity, and the spirit of friendly competition."
//         events={annualEvents}
//       />

//       {/* SECTION 2: TECH UDBHAV EVENTS */}
//       <EventSection
//         id="tech-udbhav"
//         eyebrow="Technology Meets Creativity"
//         title="Tech Udbhav Events"
//         description="Step into the world of innovation with Tech Udbhav, where engineering meets imagination. From robotics and coding to problem-solving and hands-on prototyping, these technical challenges inspire minds to think critically, collaborate, and show their creativity."
//         events={techUdbhavEvents}
//       />

//       <Footer />
//     </main>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "../components/navbar";
// import Footer from "../components/footer";
// import {
//   ArrowDown,
//   ArrowUpRight,
//   CalendarDays,
//   Radio,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const tabs = ["All", "Live Events", "Past Events"];

// function SectionHeader({ eyebrow, title, description }) {
//   return (
//     <div className="mb-12 max-w-2xl">
//       <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-300 sm:text-xs">
//         <span className="h-px w-7 bg-cyan-400" />
//         {eyebrow}
//       </p>

//       <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
//         {title}
//         <span className="text-cyan-300">.</span>
//       </h2>

//       {description && (
//         <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
//           {description}
//         </p>
//       )}
//     </div>
//   );
// }

// function EventCard({ event, variant = "default" }) {
//   return (
//     <article className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0A101C] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_20px_60px_rgba(6,182,212,0.10)]">
//       <div className="relative aspect-[4/5] overflow-hidden">
//         <img
//           src={event.image}
//           alt={event.title}
//           loading="lazy"
//           className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
//             variant === "past" ? "grayscale-[15%]" : ""
//           }`}
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-[#050812] via-[#050812]/10 to-transparent" />

//         <span className="absolute left-4 top-4 rounded-full border border-cyan-300/20 bg-[#050812]/75 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-cyan-200 backdrop-blur-lg">
//           {event.category}
//         </span>

//         <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
//           <div className="mb-3 h-px w-8 bg-cyan-300 transition-all duration-500 group-hover:w-16" />

//           <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
//             {event.title}
//           </h3>

//           <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-slate-300 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
//             {event.description}
//           </p>
//         </div>
//       </div>
//     </article>
//   );
// }

// function EmptyState({ icon: Icon, title, description }) {
//   return (
//     <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.015] px-6 text-center">
//       <Icon className="mb-4 h-7 w-7 text-cyan-300/70" />

//       <h3 className="text-lg font-medium text-white">{title}</h3>

//       <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
//         {description}
//       </p>
//     </div>
//   );
// }

// export default function EventsPage() {
//   const [activeTab, setActiveTab] = useState("All");
//   const [events, setEvents] = useState([]);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // FETCH PUBLISHED EVENTS
//   useEffect(() => {
//     let cancelled = false;

//     async function loadEvents() {
//       try {
//         const response = await fetch("/api/events/public", {
//           method: "GET",
//           cache: "no-store",
//         });

//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error(data.message || "Unable to load events.");
//         }

//         if (!cancelled) {
//           setEvents(data.events || []);
//           setError("");
//         }
//       } catch (err) {
//         if (!cancelled) {
//           setError(err.message || "Unable to load events.");
//         }
//       } finally {
//         if (!cancelled) {
//           setLoading(false);
//         }
//       }
//     }

//     loadEvents();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // FILTER EVENTS
//  const publishedEvents = events;

//   // ALL PUBLISHED LIVE EVENTS GO INTO THE HERO CAROUSEL
//   const liveEvents = publishedEvents
//     .filter((event) => event.status === "live")
//     .sort((a, b) => {
//       const orderDifference =
//         Number(a.sort_order || 0) - Number(b.sort_order || 0);

//       if (orderDifference !== 0) return orderDifference;

//       return Number(b.id) - Number(a.id);
//     });

//   const upcomingEvents = publishedEvents.filter(
//     (event) => event.status === "upcoming"
//   );

//   const pastDatabaseEvents = publishedEvents.filter(
//     (event) => event.status === "past"
//   );

//   // RESET SLIDE IF LIVE EVENTS CHANGE
//   useEffect(() => {
//     setActiveSlide((current) =>
//       liveEvents.length > 0
//         ? Math.min(current, liveEvents.length - 1)
//         : 0
//     );
//   }, [liveEvents.length]);

//   // CURRENT HERO EVENT
//   const currentSlide = liveEvents[activeSlide] || null;

//   // AUTOMATIC SLIDING
//   useEffect(() => {
//     if (liveEvents.length <= 1 || isPaused) return;

//     const interval = setInterval(() => {
//       setActiveSlide((current) => (current + 1) % liveEvents.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, [liveEvents.length, isPaused]);

//   // MANUAL SLIDE NAVIGATION
//   const goToPreviousSlide = () => {
//     setActiveSlide((current) =>
//       (current - 1 + liveEvents.length) % liveEvents.length
//     );
//   };

//   const goToNextSlide = () => {
//     setActiveSlide((current) =>
//       (current + 1) % liveEvents.length
//     );
//   };

//   // PAST EVENTS
//   const pastEvents = pastDatabaseEvents;

//   // ALL EVENTS FOR THE EVENT CARDS
//   const allEvents = [
//     ...liveEvents,
//     ...upcomingEvents,
//     ...pastEvents,
//   ].map((event) => ({
//     ...event,
//     image: event.poster_url,
//     variant: event.status === "past" ? "past" : "default",
//   }));

//   const visibleEvents =
//     activeTab === "All"
//       ? allEvents
//       : activeTab === "Live Events"
//         ? liveEvents.map((event) => ({
//             ...event,
//             image: event.poster_url,
//           }))
//         : pastEvents.map((event) => ({
//             ...event,
//             image: event.poster_url,
//             variant: "past",
//           }));

//   return (
//     <main className="min-h-screen overflow-x-clip bg-[#05070D] text-white">
//       <Navbar />

//       {/* FEATURED LIVE EVENTS CAROUSEL */}
//       <section
//         id="featured-live"
//         className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-white/[0.08]"
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//       >
//         {/* BACKGROUND VIDEO */}
//         <video
//           key={currentSlide?.id || "default-background"}
//           className="absolute inset-0 h-full w-full object-cover"
//           src={currentSlide?.video_url || "/videos/cp.mp4"}
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="metadata"
//           aria-hidden="true"
//         />

//         <div className="absolute inset-0 bg-[#030711]/45" />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#030711]/95 via-[#030711]/55 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-transparent to-[#030711]/35" />

//         {/* HERO CONTENT */}
//         <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10 md:pb-32">
//           <div className="max-w-3xl">
//             {loading ? (
//               <div className="animate-pulse">
//                 <div className="mb-8 h-9 w-36 rounded-full bg-white/10" />
//                 <div className="h-5 w-52 rounded bg-white/10" />
//                 <div className="mt-7 h-20 w-3/4 rounded bg-white/10" />
//               </div>
//             ) : error ? (
//               <>
//                 <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">
//                   IETE-SF
//                 </p>

//                 <h1 className="text-5xl font-black sm:text-7xl">
//                   Events
//                 </h1>

//                 <p className="mt-5 text-slate-300">
//                   Unable to retrieve the latest events.
//                 </p>
//               </>
//             ) : currentSlide ? (
//               <>
//                 {/* LIVE BADGE */}
//                 <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 backdrop-blur-md">
//                   <span className="relative flex h-2 w-2">
//                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
//                     <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
//                   </span>

//                   <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-200">
//                     LIVE NOW
//                   </span>
//                 </div>

//                 <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300 sm:text-sm">
//                   IETE-SF PRESENTS
//                 </p>

//                 <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-7xl md:text-8xl">
//                   {currentSlide.title}
//                 </h1>

//                 <p className="mt-7 text-lg font-medium text-white sm:text-xl">
//                   {currentSlide.category}
//                 </p>

//                 <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
//                   {currentSlide.description}
//                 </p>

//                 {currentSlide.registration_url && (
//                   <a
//                     href={currentSlide.registration_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-9 inline-flex items-center gap-3 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-6 py-4 text-sm font-semibold text-cyan-100 backdrop-blur-md transition-all duration-300 hover:bg-cyan-300 hover:text-[#050812]"
//                   >
//                     Register Now
//                     <ArrowUpRight size={18} />
//                   </a>
//                 )}

//                 {!currentSlide.registration_url && (
//                   <a
//                     href="#events"
//                     className="mt-9 inline-flex items-center gap-3 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-6 py-4 text-sm font-semibold text-cyan-100 backdrop-blur-md transition-all duration-300 hover:bg-cyan-300 hover:text-[#050812]"
//                   >
//                     Explore Events
//                     <ArrowUpRight size={18} />
//                   </a>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 backdrop-blur-md">
//                   <span className="h-2 w-2 rounded-full bg-cyan-300" />

//                   <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-200">
//                     Event Update
//                   </span>
//                 </div>

//                 <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300 sm:text-sm">
//                   IETE-SF PRESENTS
//                 </p>

//                 <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-7xl md:text-8xl">
//                   No Live Events
//                   <br />
//                   <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
//                     Right Now.
//                   </span>
//                 </h1>

//                 <p className="mt-7 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
//                   There are currently no live events happening. Stay tuned
//                   for upcoming events and updates from IETE-SF.
//                 </p>

//                 <a
//                   href="#events"
//                   className="mt-9 inline-flex items-center gap-3 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-6 py-4 text-sm font-semibold text-cyan-100 backdrop-blur-md transition-all duration-300 hover:bg-cyan-300 hover:text-[#050812]"
//                 >
//                   Explore Events
//                   <ArrowUpRight size={18} />
//                 </a>
//               </>
//             )}
//           </div>
//         </div>

//         {/* CAROUSEL NAVIGATION */}
//         {!loading && !error && liveEvents.length > 1 && (
//           <>
//             {/* PREVIOUS BUTTON */}
//             <button
//               type="button"
//               onClick={goToPreviousSlide}
//               aria-label="Previous live event"
//               className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#050812]/60 text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/50 hover:bg-cyan-300 hover:text-[#050812] sm:left-8"
//             >
//               <ChevronLeft size={24} />
//             </button>

//             {/* NEXT BUTTON */}
//             <button
//               type="button"
//               onClick={goToNextSlide}
//               aria-label="Next live event"
//               className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#050812]/60 text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/50 hover:bg-cyan-300 hover:text-[#050812] sm:right-8"
//             >
//               <ChevronRight size={24} />
//             </button>

//             {/* SLIDE INDICATORS */}
//             <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
//               {liveEvents.map((event, index) => (
//                 <button
//                   key={event.id}
//                   type="button"
//                   onClick={() => setActiveSlide(index)}
//                   aria-label={`Go to live event ${index + 1}`}
//                   aria-current={activeSlide === index ? "true" : undefined}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     activeSlide === index
//                       ? "w-9 bg-cyan-300"
//                       : "w-2 bg-white/40 hover:bg-white"
//                   }`}
//                 />
//               ))}
//             </div>
//           </>
//         )}

//         {/* SCROLL INDICATOR */}
//         <a
//           href="#events"
//           aria-label="Scroll to events"
//           className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-slate-400 transition hover:text-cyan-300"
//         >
//           Scroll to explore
//           <ArrowDown className="h-4 w-4 animate-bounce" />
//         </a>
//       </section>

//       {/* EVENTS SECTION */}
//       <section
//         id="events"
//         className="scroll-mt-20 px-5 py-24 sm:px-8 md:py-32"
//       >
//         <div className="mx-auto max-w-7xl">
//           <SectionHeader
//             eyebrow="Explore the experience"
//             title="Our Events"
//             description="Discover what's happening, what's coming next, and the memories we've created together."
//           />

//           {/* CENTERED TABS */}
//           <div className="mb-14 flex justify-center">
//             <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0A101C] p-2">
//               {tabs.map((tab) => {
//                 const isActive = activeTab === tab;

//                 return (
//                   <button
//                     key={tab}
//                     type="button"
//                     onClick={() => setActiveTab(tab)}
//                     aria-pressed={isActive}
//                     className={`rounded-xl px-5 py-3 text-xs font-semibold transition-all duration-300 sm:px-8 sm:text-sm ${
//                       isActive
//                         ? "border border-cyan-300/30 bg-cyan-300 text-[#050812]"
//                         : "border border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-white"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <div key={activeTab}>
//             {loading ? (
//               <EmptyState
//                 icon={CalendarDays}
//                 title="Loading events"
//                 description="Please wait while we retrieve the latest events."
//               />
//             ) : error ? (
//               <EmptyState
//                 icon={CalendarDays}
//                 title="Unable to load events"
//                 description={error}
//               />
//             ) : visibleEvents.length > 0 ? (
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {visibleEvents.map((event) => (
//                   <EventCard
//                     key={event.id}
//                     event={event}
//                     variant={event.variant || "default"}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <EmptyState
//                 icon={activeTab === "Live Events" ? Radio : CalendarDays}
//                 title={
//                   activeTab === "Live Events"
//                     ? "No live events right now"
//                     : "Something exciting is on its way"
//                 }
//                 description={
//                   activeTab === "Live Events"
//                     ? "Live events will appear here when announced."
//                     : "Events will appear here as soon as they are published."
//                 }
//               />
//             )}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }


"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Radio,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const tabs = ["All", "Live Events", "Past Events"];

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-300 sm:text-xs">
        <span className="h-px w-7 bg-cyan-400" />
        {eyebrow}
      </p>

      <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
        {title}
        <span className="text-cyan-300">.</span>
      </h2>

      {description && (
        <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function EventCard({ event, variant = "default" }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0A101C] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_20px_60px_rgba(6,182,212,0.10)]">
      <div className="relative aspect-[4/5] overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              variant === "past" ? "grayscale-[15%]" : ""
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#101B2C] to-[#050812]">
            <CalendarDays className="h-12 w-12 text-cyan-300/40" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#050812] via-[#050812]/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-cyan-300/20 bg-[#050812]/75 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-cyan-200 backdrop-blur-lg">
          {event.category}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="mb-3 h-px w-8 bg-cyan-300 transition-all duration-500 group-hover:w-16" />

          <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {event.title}
          </h3>

          <p className="mt-3 max-h-0 overflow-hidden text-sm leading-6 text-slate-300 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
            {event.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.015] px-6 text-center">
      <Icon className="mb-4 h-7 w-7 text-cyan-300/70" />

      <h3 className="text-lg font-medium text-white">{title}</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [events, setEvents] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // TOUCH SWIPE REFERENCES
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // FETCH PUBLISHED EVENTS
  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      try {
        const response = await fetch("/api/events/public", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load events.");
        }

        if (!cancelled) {
          setEvents(data.events || []);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load events.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  // THE PUBLIC API ALREADY FILTERS PUBLISHED EVENTS
  const publishedEvents = events;

  // LIVE EVENTS FOR HERO CAROUSEL
  const liveEvents = publishedEvents
    .filter((event) => event.status === "live")
    .sort((a, b) => {
      const orderDifference =
        Number(a.sort_order || 0) - Number(b.sort_order || 0);

      if (orderDifference !== 0) return orderDifference;

      return Number(b.id) - Number(a.id);
    });

  // UPCOMING AND PAST EVENTS
  const upcomingEvents = publishedEvents.filter(
    (event) => event.status === "upcoming"
  );

  const pastEvents = publishedEvents.filter(
    (event) => event.status === "past"
  );

  // KEEP ACTIVE SLIDE WITHIN VALID RANGE
  useEffect(() => {
    setActiveSlide((current) =>
      liveEvents.length > 0
        ? Math.min(current, liveEvents.length - 1)
        : 0
    );
  }, [liveEvents.length]);

  // CURRENT HERO EVENT
  const currentSlide = liveEvents[activeSlide] || null;

  // MANUAL NAVIGATION
  const goToPreviousSlide = () => {
    if (liveEvents.length <= 1) return;

    setActiveSlide(
      (current) =>
        (current - 1 + liveEvents.length) % liveEvents.length
    );
  };

  const goToNextSlide = () => {
    if (liveEvents.length <= 1) return;

    setActiveSlide(
      (current) => (current + 1) % liveEvents.length
    );
  };

  // TOUCH START
  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
    touchStartY.current = event.changedTouches[0].clientY;
  };

  // TOUCH END: HORIZONTAL SWIPE
  const handleTouchEnd = (event) => {
    if (liveEvents.length <= 1) return;

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    // Ignore small movements and vertical scrolling
    if (
      Math.abs(deltaX) < 50 ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      goToNextSlide();
    } else {
      goToPreviousSlide();
    }
  };

  // AUTOMATIC SLIDING
  useEffect(() => {
    if (liveEvents.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide(
        (current) => (current + 1) % liveEvents.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [liveEvents.length, isPaused]);

  // ALL EVENTS FOR CARDS
  const allEvents = [
    ...liveEvents,
    ...upcomingEvents,
    ...pastEvents,
  ].map((event) => ({
    ...event,
    image: event.poster_url,
    variant: event.status === "past" ? "past" : "default",
  }));

  // TAB FILTERING
  const visibleEvents =
    activeTab === "All"
      ? allEvents
      : activeTab === "Live Events"
        ? liveEvents.map((event) => ({
            ...event,
            image: event.poster_url,
          }))
        : pastEvents.map((event) => ({
            ...event,
            image: event.poster_url,
            variant: "past",
          }));

  return (
    <main className="min-h-screen overflow-x-clip bg-[#05070D] text-white">
      <Navbar />

      {/* FEATURED LIVE EVENTS CAROUSEL */}
      <section
        id="featured-live"
        className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-white/[0.08]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* BACKGROUND VIDEO */}
        <video
          key={currentSlide?.id || "default-background"}
          className="absolute inset-0 h-full w-full object-cover"
          src={currentSlide?.video_url || "/videos/cp.mp4"}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-[#030711]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030711]/95 via-[#030711]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-transparent to-[#030711]/35" />

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10 md:pb-32">
          <div className="max-w-3xl">
            {loading ? (
              <div className="animate-pulse">
                <div className="mb-8 h-9 w-36 rounded-full bg-white/10" />
                <div className="h-5 w-52 rounded bg-white/10" />
                <div className="mt-7 h-20 w-3/4 rounded bg-white/10" />
              </div>
            ) : error ? (
              <>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">
                  IETE-SF
                </p>

                <h1 className="text-5xl font-black sm:text-7xl">
                  Events
                </h1>

                <p className="mt-5 text-slate-300">
                  Unable to retrieve the latest events.
                </p>
              </>
            ) : currentSlide ? (
              <>
                {/* LIVE BADGE */}
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-200">
                    LIVE NOW
                  </span>
                </div>

                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300 sm:text-sm">
                  IETE-SF PRESENTS
                </p>

                <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-7xl md:text-8xl">
                  {currentSlide.title}
                </h1>

                <p className="mt-7 text-lg font-medium text-white sm:text-xl">
                  {currentSlide.category}
                </p>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                  {currentSlide.description}
                </p>

                {currentSlide.registration_url ? (
                  <a
                    href={currentSlide.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-9 inline-flex items-center gap-3 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-6 py-4 text-sm font-semibold text-cyan-100 backdrop-blur-md transition-all duration-300 hover:bg-cyan-300 hover:text-[#050812]"
                  >
                    Register Now
                    <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <a
                    href="#events"
                    className="mt-9 inline-flex items-center gap-3 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-6 py-4 text-sm font-semibold text-cyan-100 backdrop-blur-md transition-all duration-300 hover:bg-cyan-300 hover:text-[#050812]"
                  >
                    Explore Events
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </>
            ) : (
              <>
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-200">
                    Event Update
                  </span>
                </div>

                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300 sm:text-sm">
                  IETE-SF PRESENTS
                </p>

                <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-7xl md:text-8xl">
                  No Live Events
                  <br />
                  <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                    Right Now.
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                  There are currently no live events happening. Stay tuned
                  for upcoming events and updates from IETE-SF.
                </p>

                <a
                  href="#events"
                  className="mt-9 inline-flex items-center gap-3 rounded-xl border border-cyan-300/40 bg-cyan-300/10 px-6 py-4 text-sm font-semibold text-cyan-100 backdrop-blur-md transition-all duration-300 hover:bg-cyan-300 hover:text-[#050812]"
                >
                  Explore Events
                  <ArrowUpRight size={18} />
                </a>
              </>
            )}
          </div>
        </div>

        {/* CAROUSEL ARROWS */}
        {!loading && !error && liveEvents.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Previous live event"
              className="absolute left-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#050812]/60 text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/50 hover:bg-cyan-300 hover:text-[#050812] sm:left-8"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Next live event"
              className="absolute right-5 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#050812]/60 text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/50 hover:bg-cyan-300 hover:text-[#050812] sm:right-8"
            >
              <ChevronRight size={24} />
            </button>

            {/* SLIDE DOTS */}
            <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
              {liveEvents.map((event, index) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to live event ${index + 1}`}
                  aria-current={
                    activeSlide === index ? "true" : undefined
                  }
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? "w-9 bg-cyan-300"
                      : "w-2 bg-white/40 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* SCROLL INDICATOR */}
        <a
          href="#events"
          aria-label="Scroll to events"
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-slate-400 transition hover:text-cyan-300"
        >
          Scroll to explore
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* EVENTS SECTION */}
      <section
        id="events"
        className="scroll-mt-20 px-5 py-24 sm:px-8 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Explore the experience"
            title="Our Events"
            description="Discover what's happening, what's coming next, and the memories we've created together."
          />

          {/* TABS */}
          <div className="mb-14 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0A101C] p-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    aria-pressed={isActive}
                    className={`rounded-xl px-5 py-3 text-xs font-semibold transition-all duration-300 sm:px-8 sm:text-sm ${
                      isActive
                        ? "border border-cyan-300/30 bg-cyan-300 text-[#050812]"
                        : "border border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* EVENT CARDS */}
          <div key={activeTab}>
            {loading ? (
              <EmptyState
                icon={CalendarDays}
                title="Loading events"
                description="Please wait while we retrieve the latest events."
              />
            ) : error ? (
              <EmptyState
                icon={CalendarDays}
                title="Unable to load events"
                description={error}
              />
            ) : visibleEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    variant={event.variant || "default"}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={
                  activeTab === "Live Events" ? Radio : CalendarDays
                }
                title={
                  activeTab === "Live Events"
                    ? "No live events right now"
                    : "Something exciting is on its way"
                }
                description={
                  activeTab === "Live Events"
                    ? "Live events will appear here when announced."
                    : "Events will appear here as soon as they are published."
                }
              />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


