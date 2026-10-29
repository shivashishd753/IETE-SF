
// "use client";

// import { useState, useEffect } from "react";
// import IntroLoader from "./components/introloader"


// import Navbar from "./components/navbar";
// import Footer from "./components/footer";


// import IetePyramid from "./components/Ietepyramid";


// import {
//   HomeIcon,
//   Info,
//   UsersRound,
//   GraduationCap,
//   CalendarDays,
//   Layers3,
//   Mail,
//   LogIn,
// } from "lucide-react";


// export default function Home() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [logoOpacity, setLogoOpacity] = useState(1);
// useEffect(() => {
//   const handleScroll = () => {
//     const fadeStart = 80;
//     const fadeDistance = 400;

//     const progress = Math.min(
//       Math.max((window.scrollY - fadeStart) / fadeDistance, 0),
//       1
//     );

//     setLogoOpacity(1 - progress);
//   };

//   window.addEventListener("scroll", handleScroll, {
//     passive: true,
//   });

//   handleScroll();

//   return () => window.removeEventListener("scroll", handleScroll);
// }, []);

//   return (
//     <>
//   <IntroLoader />
//     <main id="home" className="min-h-screen overflow-x-clip bg-[#070B18] text-white">


// <Navbar />


// {/* Tech Udbhav + Join Us buttons
// <div className="fixed left-1/2 top-[125px] z-40 flex
//   -translate-x-1/2 items-center justify-center gap-3 sm:gap-5">

//   {[
//     {
//       label: "Tech Udbhav",
//       href: "https://techudbhav.ietebit.com/",
//     },
//     {
//       label: "Join Us",
//       href: "https://iete-induction-26.vercel.app/",
//     },
//   ].map((item) => (
//     <a
//       key={item.label}
//       href={item.href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="group relative inline-flex items-center gap-3
//         overflow-hidden rounded-full border border-violet-300/30
//         bg-gradient-to-r from-[#24104f]/95 via-[#17152f]/95
//         to-[#071c35]/95 px-5 py-3 text-sm font-semibold
//         tracking-wide text-white shadow-[0_0_22px_rgba(124,58,237,0.18)]
//         backdrop-blur-xl transition-all duration-300
//         hover:-translate-y-0.5 hover:border-cyan-300/70
//         hover:shadow-[0_0_28px_rgba(34,211,238,0.25)]
//         sm:px-7"
//     >
//       <span className="absolute inset-0 -translate-x-full
//         bg-gradient-to-r from-transparent via-white/10 to-transparent
//         transition-transform duration-700 group-hover:translate-x-full" />

//       <span className="relative">{item.label}</span>

//       <span className="relative flex h-6 w-6 items-center
//         justify-center rounded-full border border-white/20
//         bg-white/[0.08] text-cyan-200 transition-all duration-300
//         group-hover:border-cyan-300/50 group-hover:bg-cyan-300/10
//         group-hover:translate-x-0.5">
//         ↗
//       </span>
//     </a>
//   ))}
// </div> */}



// {/* Tech Udbhav + Join Us */}
// <div className="mt-5 absolute left-1/2 top-[125px] z-40 flex -translate-x-1/2 items-center gap-3 sm:gap-5">
//   {[
//     {
//       label: "Tech Udbhav",
//       href: "https://techudbhav.ietebit.com/",
//     },
//     {
//       label: "Join Us",
//       href: "https://iete-induction-26.vercel.app/",
//     },
//   ].map((item) => (
//     <a
//       key={item.label}
//       href={item.href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="group relative flex items-center gap-4 rounded-xl border border-violet-400/40 bg-[#0B0B19]/85 px-4 py-3 shadow-[0_0_18px_rgba(139,92,246,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/70 hover:shadow-[0_0_24px_rgba(34,211,238,0.18)] sm:px-5"
//     >
//       <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)] transition-shadow group-hover:shadow-[0_0_15px_rgba(103,232,249,1)]" />

//       <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-white transition-colors group-hover:text-cyan-200">
//         {item.label}
//       </span>

//       <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-base text-violet-200 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10 group-hover:text-cyan-200">
//         ↗
//       </span>
//     </a>
//   ))}
// </div>





// <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-20 pt-36">
//   {/* Simple dark background */}
  

// {/* Layer 1: Navy base and blue ambient lighting */}
// <div
//   className="pointer-events-none absolute inset-0 z-0"
//   style={{
//     background: `
//       radial-gradient(
//         ellipse at 50% 43%,
//         rgba(15, 91, 220, 0.20) 0%,
//         rgba(12, 39, 91, 0.13) 30%,
//         transparent 62%
//       ),
//       radial-gradient(
//         ellipse at 50% 100%,
//         rgba(13, 53, 115, 0.14) 0%,
//         transparent 55%
//       ),
//       linear-gradient(
//         135deg,
//         #0b1020 0%,
//         #070b17 48%,
//         #03050b 100%
//       )
//     `,
//   }}
// />

// {/* Layer 2: Faint technical grid */}
// <div
//   className="pointer-events-none absolute inset-0 z-0"
//   style={{
//     backgroundImage: `
//       linear-gradient(rgba(82, 137, 220, 0.035) 1px, transparent 1px),
//       linear-gradient(90deg, rgba(82, 137, 220, 0.035) 1px, transparent 1px)
//     `,
//     backgroundSize: "64px 64px",
//     maskImage:
//       "radial-gradient(ellipse at center, black 0%, transparent 78%)",
//     WebkitMaskImage:
//       "radial-gradient(ellipse at center, black 0%, transparent 78%)",
//   }}
// />





//   <div className="flex w-full max-w-5xl flex-col items-center text-center">
  

// {/* <div className="relative z-30 mb-7 flex flex-col items-center sm:mb-8">
//   <h1 className="flex items-center gap-2 text-2xl font-black uppercase tracking-[0.18em] sm:gap-3 sm:text-4xl sm:tracking-[0.24em]">
//     <span className="bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
//       IETE
//     </span>

//     <span className="h-6 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent sm:h-8" />

//     <span className="bg-gradient-to-b from-cyan-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
//       SF
//     </span>
//   </h1>

//   <div className="mt-3 h-px w-20 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent sm:w-28" />

//   <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.28em] text-slate-400 sm:text-[10px] sm:tracking-[0.4em]">
//     Students’ Forum
//   </p>
// </div> */}





// {/* Fixed rotating pyramid */}
// <div
//   className="pointer-events-none fixed left-1/2 top-[17vh] z-20
//     w-full max-w-[min(76vw,520px)] -translate-x-1/2"
//   style={{
//     opacity: logoOpacity,
//     transition: "opacity 80ms linear",
//     willChange: "opacity",
//   }}
// >
//   <div className="relative">
//     {/* Blue glow */}
//     <div
//       className="absolute left-1/2 top-1/2 -z-10
//         h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2
//         rounded-full bg-blue-500/20 blur-[90px]
//         sm:h-[420px] sm:w-[420px]"
//     />

//     <IetePyramid />
//   </div>
// </div>
// {/* Keeps the original hero layout spacing */}
// <div
//   className="h-[460px] w-full max-w-[min(76vw,520px)]"
//   aria-hidden="true"
// />




//     {/* <div className="relative z-10 mt-7 sm:mt-10">
//       <p className="text-sm font-medium tracking-[0.32em] text-slate-200 sm:text-base">
//         LEARN <span className="mx-2 text-blue-400">/</span>
//         BUILD <span className="mx-2 text-blue-400">/</span>
//         GROW
//       </p>

//       <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-slate-500 sm:text-xs sm:tracking-[0.4em]">
//         Technology · Innovation · Community
//       </p>
//     </div> */}




// {/* Who We Are */}
// <section className="relative z-30 -mt-3 w-full px-6 pb-16 text-center sm:-mt-5 sm:px-24 md:px-20 lg:px-28" >
//   <p className="text-xs font-semibold uppercase tracking-[0.7em] text-cyan-300 sm:text-2xl">
//     Who We Are
//   </p>

//   <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
//     Advancing Technology.
//     <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent">
//       Inspiring Innovation.
//     </span>
//   </h2>

//   <p className="mt-6 w-full text-left text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg">
//     The Institution of Electronics and Telecommunication Engineers
//     (IETE), established in 1953, is a national professional body
//     promoting excellence in Electronics, Telecommunication and
//     Information Technology. At BIT Sindri, the IETE Students’ Forum
//     was established in 2007 to connect learning with hands-on
//     experience, collaboration and innovation.
//   </p>

//   <a
//     href="/about"
//     className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-white sm:text-base"
//   >
//     Discover Our Story <span aria-hidden="true">→</span>
//   </a>
// </section>


//   </div>
// </section>



// {/* THE IETEVERSE */}

// {/* THE IETEVERSE */}
// <section
//   id="ieteverse"
//   className="relative w-full overflow-visible bg-transparent px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
// >
//   <div className="mx-auto max-w-[1700px]">
//     <div className="mb-12 text-center sm:mb-16">

// <h2
//   className="text-5xl font-semibold tracking-[0.04em] text-transparent sm:text-7xl md:text-8xl lg:text-9xl"
//   style={{
//     WebkitTextStroke: "1.2px #C4D9E8",
//     textShadow: "0 0 18px rgba(103,232,249,0.22)",
//   }}
// >
//   The IETEverse
// </h2>


//       <p className="mt-4 text-sm text-slate-400 sm:text-base">
//         Ideas, experiences, and moments that bring us together.
//       </p>
//     </div>


//     {/* Horizontally scrollable event posters */}
//     <div className="overflow-x-auto overflow-y-hidden pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//       <div className="flex w-max items-center gap-5 px-1 py-3 sm:gap-7">
        
// {[
//   { title: "Vibe-a-thon", image: "/events/vibe-a-thon.jpg" },
//   { title: "Clue-e-minati", image: "/events/clue-e-minati.jpg" },
//   { title: "Nexus 3.0", image: "/events/nexus-3.jpg" },
//   { title: "BGMI Campus Combat", image: "/events/bgmi.jpg" },
//   { title: "Tech Talks", image: "/events/tech-talks.jpg" },
//   { title: "Codeathon", image: "/events/codeathon.jpg" },
//   { title: "Ideathon", image: "/events/ideathon.jpg" },
//   { title: "Project Expo", image: "/events/project-expo.jpg" },
//   { title: "Workshop", image: "/events/workshop.jpg" },
//   { title: "Tech Udbhav", image: "/events/tech-udbhav.jpg" },
// ].map((event) => (
//           <article
//             key={event.title}
//            className="group relative h-[340px] w-[245px] shrink-0 overflow-hidden rounded-xl border border-white/10 transition-all duration-300 ease-out hover:z-10 hover:scale-105 hover:border-cyan-300/40 sm:h-[420px] sm:w-[300px]"
//           >
//             <img
//               src={event.image}
//               alt={`${event.title} event poster`}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
//             />

//             <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-5 pt-16">
//               <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
//                 {event.title}
//               </h3>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   </div>
// </section>

//     {/* <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-slate-500 sm:text-xs sm:tracking-[0.4em]">
//         Technology · Innovation · Community
//       </p> */}
      
// <Footer />
//     </main>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import IntroLoader from "./components/introloader";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import WeeklyCube from "./components/weeklycube";

export default function Home() {
  const [logoOpacity, setLogoOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const fadeStart = 80;
      const fadeDistance = 400;

      const progress = Math.min(
        Math.max((window.scrollY - fadeStart) / fadeDistance, 0),
        1
      );

      setLogoOpacity(1 - progress);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <IntroLoader />

      <main
        id="home"
        className="min-h-screen overflow-x-clip bg-[#070B18] text-white"
      >
        <Navbar />

        {/* Tech Udbhav + Join Us buttons */}
        <div className="absolute left-1/2 top-[125px] z-40 mt-5 flex -translate-x-1/2 items-center gap-3 sm:gap-5">
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
              className="group relative flex items-center gap-4 rounded-xl border border-violet-400/40 bg-[#0B0B19]/85 px-4 py-3 shadow-[0_0_18px_rgba(139,92,246,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/70 hover:shadow-[0_0_24px_rgba(34,211,238,0.18)] sm:px-5"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)] transition-shadow group-hover:shadow-[0_0_15px_rgba(103,232,249,1)]" />

              <span className="whitespace-nowrap text-sm font-semibold tracking-wide text-white transition-colors group-hover:text-cyan-200">
                {item.label}
              </span>

              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-base text-violet-200 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10 group-hover:text-cyan-200">
                ↗
              </span>
            </a>
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-12 pt-36">
          {/* Dark navy background with subtle blue lighting */}
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

          {/* Subtle technical grid */}
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

          {/* Existing rotating pyramid */}
          <div
            className="pointer-events-none fixed left-1/2 top-[17vh] z-20 w-full max-w-[min(76vw,520px)] -translate-x-1/2"
            style={{
              opacity: logoOpacity,
              transition: "opacity 80ms linear",
              willChange: "opacity",
            }}
          >
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[90px] sm:h-[420px] sm:w-[420px]" />

              {/* <IetePyramid /> */}
            </div>
          </div>

          {/* Keeps space for the pyramid */}
          <div
            className="h-[460px] w-full max-w-[min(76vw,520px)]"
            aria-hidden="true"
          />

          {/* IETE-SF title */}
          <div className="relative z-30 -mt-5 text-center sm:-mt-8">
            <h1 className="text-4xl font-black uppercase tracking-[0.18em] text-white sm:text-6xl sm:tracking-[0.24em]">
              IETE-SF
            </h1>

            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent sm:w-32" />

            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400 sm:text-xs sm:tracking-[0.4em]">
              Students’ Forum · BIT Sindri
            </p>
          </div>
        </section>

        {/* Weekly Segment */}
        
        <section
          id="weekly-segment"
          className="relative z-30 mx-auto w-full max-w-6xl px-6 py-20 sm:py-28"
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">
              Discover · Learn · Grow
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-wide text-white sm:text-5xl">
              Weekly Segment
            </h2>

            <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Fresh ideas, technology insights, and knowledge worth sharing.
            </p>
          </div>

          {/* Weekly segment content can be added here */}
        </section>
<WeeklyCube />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}