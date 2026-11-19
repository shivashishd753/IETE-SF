
// "use client";

// import { useEffect, useRef, useState } from "react";

// const segments = [
//   {
//     number: "01",
//     eyebrow: "IETE STUDENTS’ FORUM",
//     title: "Ideas into impact.",
//     description:
//       "A space to explore technology, build skills, and turn curiosity into action.",
//     accent: "cyan",
//   },
//   {
//     number: "02",
//     eyebrow: "LEARN · BUILD · COLLABORATE",
//     title: "Make things happen.",
//     description:
//       "Work together on hands-on experiences, technical sessions, and ambitious projects.",
//     accent: "violet",
//   },
//   {
//     number: "03",
//     eyebrow: "YOUR NEXT CHAPTER",
//     title: "Build what’s next.",
//     description:
//       "Meet people, sharpen your skills, and bring your ideas into the real world.",
//     accent: "blue",
//   },
// ];

// export default function WeeklyCube() {
//   const sectionRef = useRef(null);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let frame = 0;

//     const updateProgress = () => {
//       cancelAnimationFrame(frame);

//       frame = requestAnimationFrame(() => {
//         const section = sectionRef.current;
//         if (!section) return;

//         const travel = section.offsetHeight - window.innerHeight;
//         const scrolled = -section.getBoundingClientRect().top;

//         const nextProgress =
//           travel > 0
//             ? Math.max(0, Math.min(1, scrolled / travel))
//             : 0;

//         setProgress(nextProgress);
//       });
//     };

//     window.addEventListener("scroll", updateProgress, {
//       passive: true,
//     });
//     window.addEventListener("resize", updateProgress);

//     updateProgress();

//     return () => {
//       cancelAnimationFrame(frame);
//       window.removeEventListener("scroll", updateProgress);
//       window.removeEventListener("resize", updateProgress);
//     };
//   }, []);

//   const angle = progress * 180;
//   const activeIndex = Math.min(
//     2,
//     Math.floor((angle + 0.001) / 90)
//   );

//   return (
//     <section
//       ref={sectionRef}
//       aria-label="Explore IETE Students’ Forum"
//       className="relative h-[260svh] bg-[#050A18] text-white"
//     >
// <div className="sticky top-[138px] flex h-[calc(100svh-138px)] flex-col items-center justify-center overflow-hidden px-5">        <div
//           aria-hidden="true"
//           className="pointer-events-none absolute left-[calc(50%-19rem)] top-1/2 h-[28rem] w-[22rem] -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[110px]"
//         />

//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute left-[calc(50%+2rem)] top-1/2 h-[28rem] w-[22rem] -translate-y-1/2 rounded-full bg-violet-600/25 blur-[110px]"
//         />

//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute bottom-[7%] left-1/2 w-max -translate-x-1/2 select-none whitespace-nowrap text-[clamp(4rem,14vw,12rem)] font-semibold tracking-[-0.08em] text-blue-400/[0.08]"
//         >
//           IETE-SF
//         </div>

//         <div className="relative z-10 mb-7 flex items-center gap-3 text-[10px] font-medium tracking-[0.32em] text-slate-300 sm:text-xs">
//           <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]" />
//           EXPLORE THE FORUM
//         </div>

//         <div
//           className="relative z-10 w-full max-w-[560px]"
//           style={{ perspective: "1800px" }}
//         >
//           <div
//             className="relative aspect-square w-full"
//             style={{
//               transformStyle: "preserve-3d",
//               transform: `rotateX(${angle}deg)`,
//               willChange: "transform",
//             }}
//           >
//             {segments.map((segment, index) => (
//               <article
//                 key={segment.number}
//                 className="absolute inset-0 overflow-hidden border border-white/10 bg-[#070B18] text-center"
//                 style={{
//                   transform: `rotateX(${-index * 90}deg) translateZ(min(calc((100vw - 2.5rem) / 2), 280px))`,
//                   backfaceVisibility: "hidden",
//                   boxShadow:
//                     index === activeIndex
//                       ? "0 0 45px rgba(30,120,255,.16), inset 0 0 55px rgba(30,120,255,.08)"
//                       : "inset 0 0 35px rgba(30,120,255,.05)",
//                 }}
//               >
//                 <div className="flex h-full w-full flex-col items-center justify-center px-7 py-10 sm:px-12">
//                   <div
//                     className={`mb-8 grid h-[76px] w-[76px] place-items-center border border-white/10 bg-gradient-to-br ${
//                       segment.accent === "violet"
//                         ? "from-violet-500/25 to-fuchsia-500/5"
//                         : segment.accent === "blue"
//                           ? "from-blue-500/25 to-cyan-500/5"
//                           : "from-cyan-400/25 to-blue-500/5"
//                     }`}
//                   >
//                     <span className="text-2xl font-light tracking-widest">
//                       {segment.number}
//                     </span>
//                   </div>

//                   <p className="text-[10px] font-medium tracking-[0.25em] text-cyan-200 sm:text-xs">
//                     {segment.eyebrow}
//                   </p>

//                   <h2 className="mt-5 max-w-[440px] text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
//                     {segment.title}
//                   </h2>

//                   <p className="mt-5 max-w-[380px] text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
//                     {segment.description}
//                   </p>

//                   <div className="mt-8 h-1 w-20 bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-500" />
//                 </div>
//               </article>
//             ))}
//           </div>

//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -inset-x-1 top-0 h-2 bg-gradient-to-r from-cyan-300/60 via-slate-900 to-violet-500/60 blur-[1px]"
//           />

//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute -inset-x-1 bottom-0 h-2 bg-gradient-to-r from-cyan-300/40 via-black to-violet-500/50 blur-[1px]"
//           />
//         </div>

//         <div className="relative z-10 mt-8 flex items-center gap-3">
//           {segments.map((segment, index) => (
//             <span
//               key={segment.number}
//               className={`h-1 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? "w-9 bg-cyan-200"
//                   : "w-3 bg-white/25"
//               }`}
//             />
//           ))}
//         </div>

//         <p className="relative z-10 mt-4 text-[10px] tracking-[0.25em] text-slate-500 sm:text-xs">
//           SCROLL TO EXPLORE
//         </p>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";

const MEDIA = {
  innoventure: "/weekly-media/inoventure.svg",
  innotech: "/weekly-media/innotech.mp4",
  tech: "/weekly-media/tech-in-action.svg",
};

const segments = [
  {
    number: "01",
    eyebrow: "INNOVENTURE",
    title: "Ideas into impact.",
    description:
      "A space to explore technology, build skills, and turn curiosity into action.",
  },
  {
    number: "02",
    eyebrow: "INNOTECH",
    title: "Make things happen.",
    description:
      "Work together on hands-on experiences, technical sessions, and ambitious projects.",
  },
  {
    number: "03",
    eyebrow: "TECH IN ACTION",
    title: "Build what's next.",
    description:
      "Meet people, sharpen your skills, and bring your ideas into the real world.",
  },
];

const posterPositions = [
  ["-2%", "2%", 125, -17],
  ["9%", "13%", 105, 12],
  ["21%", "-3%", 135, -9],
  ["34%", "12%", 95, 16],
  ["47%", "-4%", 120, -13],
  ["60%", "10%", 145, 8],
  ["75%", "-2%", 110, -15],
  ["89%", "12%", 135, 11],
  ["96%", "32%", 115, -8],
  ["-3%", "32%", 140, 10],
  ["12%", "38%", 100, -14],
  ["25%", "29%", 125, 7],
  ["39%", "40%", 110, -11],
  ["53%", "31%", 135, 14],
  ["68%", "43%", 100, -7],
  ["82%", "32%", 145, 12],
  ["-4%", "58%", 115, -12],
  ["10%", "69%", 140, 9],
  ["25%", "59%", 105, -16],
  ["39%", "72%", 130, 11],
  ["54%", "62%", 110, -8],
  ["69%", "74%", 140, 15],
  ["84%", "61%", 105, -13],
  ["96%", "76%", 130, 8],
  ["1%", "88%", 115, -9],
  ["17%", "91%", 135, 13],
  ["34%", "87%", 105, -12],
  ["50%", "94%", 125, 7],
  ["66%", "88%", 110, -15],
  ["81%", "94%", 140, 10],
];

export default function WeeklyCube() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const travel = section.offsetHeight - window.innerHeight;
        const scrolled = -section.getBoundingClientRect().top;

        setProgress(
          travel > 0
            ? Math.max(0, Math.min(1, scrolled / travel))
            : 0
        );
      });
    };

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hoveredIndex === 1) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [hoveredIndex]);

  const angle = progress * 180;
  const activeIndex = Math.min(2, Math.floor((angle + 0.001) / 90));
  const showPosters = hoveredIndex === 0 || hoveredIndex === 2;

  const posterSource =
    hoveredIndex === 0 ? MEDIA.innoventure : MEDIA.tech;

  return (
    <section
      ref={sectionRef}
      aria-label="Explore IETE Students' Forum"
      className="relative h-[260svh] bg-[#050A18] text-white"
    >
      {/* Softer charcoal-black background */}
      <div
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${
          hoveredIndex !== null
            ? "opacity-100"
            : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(135deg, #242424 0%, #181818 45%, #101010 100%)",
        }}
      />

      {/* INNOTECH video */}
      <video
        ref={videoRef}
        src={MEDIA.innotech}
        muted
        loop
        playsInline
        preload="metadata"
        className={`pointer-events-none fixed inset-0 z-[1] h-full w-full object-cover transition-opacity duration-700 ${
          hoveredIndex === 1 ? "opacity-[0.18]" : "opacity-0"
        }`}
      />

      {/* Section-specific scattered posters */}
      <div
        className={`pointer-events-none fixed inset-0 z-[2] overflow-hidden transition-opacity duration-700 ${
          showPosters ? "opacity-100" : "opacity-0"
        }`}
      >
        {showPosters &&
          posterPositions.map(([x, y, width, rotation], index) => (
            <img
              key={`${hoveredIndex}-${index}`}
              src={posterSource}
              alt=""
              draggable="false"
              className="absolute h-auto max-w-none object-contain"
              style={{
                left: x,
                top: y,
                width: `${width}px`,
                transform: `rotate(${rotation}deg)`,
                opacity: 0.38,
              }}
            />
          ))}
      </div>

      {/* Foreground content */}
      <div className="sticky top-[138px] flex h-[calc(100svh-138px)] flex-col items-center justify-center overflow-hidden px-5">

        <div className="relative z-30 mb-7 flex items-center gap-3 text-[10px] font-medium tracking-[0.32em] text-slate-300 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          EXPLORE THE FORUM
        </div>

        {/* Opaque cube */}
        <div
          className="relative z-30 w-full max-w-[560px]"
          style={{
            perspective: "1800px",
            isolation: "isolate",
          }}
        >
          <div
            className="relative aspect-square w-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${angle}deg)`,
              willChange: "transform",
            }}
          >
            {segments.map((segment, index) => (
              <article
                key={segment.number}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute inset-0 overflow-hidden border border-white/20 text-center"
                style={{
                  transform: `rotateX(${-index * 90}deg) translateZ(min(calc((100vw - 2.5rem) / 2), 280px))`,
                  backfaceVisibility: "hidden",
                  background: "#070B18",
                  opacity: 1,
                  boxShadow: "none",
                }}
              >
                <div
                  className="flex h-full w-full flex-col items-center justify-center px-7 py-10 sm:px-12"
                  style={{ background: "#070B18" }}
                >
                  <div className="mb-8 grid h-[76px] w-[76px] place-items-center border border-white/20">
                    <span className="text-2xl font-light tracking-widest">
                      {segment.number}
                    </span>
                  </div>

                  <p className="text-[10px] font-medium tracking-[0.25em] text-slate-300 sm:text-xs">
                    {segment.eyebrow}
                  </p>

                  <h2 className="mt-5 max-w-[440px] text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                    {segment.title}
                  </h2>

                  <p className="mt-5 max-w-[380px] text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                    {segment.description}
                  </p>

                  <div className="mt-8 h-px w-20 bg-white/60" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative z-30 mt-8 flex items-center gap-3">
          {segments.map((segment, index) => (
            <span
              key={segment.number}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-9 bg-white"
                  : "w-3 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
