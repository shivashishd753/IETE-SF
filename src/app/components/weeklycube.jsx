
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

const segments = [
  {
    number: "01",
    eyebrow: "IETE STUDENTS’ FORUM",
    title: "Ideas into impact.",
    description:
      "A space to explore technology, build skills, and turn curiosity into action.",
    accent: "cyan",
  },
  {
    number: "02",
    eyebrow: "LEARN · BUILD · COLLABORATE",
    title: "Make things happen.",
    description:
      "Work together on hands-on experiences, technical sessions, and ambitious projects.",
    accent: "violet",
  },
  {
    number: "03",
    eyebrow: "YOUR NEXT CHAPTER",
    title: "Build what’s next.",
    description:
      "Meet people, sharpen your skills, and bring your ideas into the real world.",
    accent: "blue",
  },
];

export default function WeeklyCube() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const travel = section.offsetHeight - window.innerHeight;
        const scrolled = -section.getBoundingClientRect().top;

        const nextProgress =
          travel > 0
            ? Math.max(0, Math.min(1, scrolled / travel))
            : 0;

        setProgress(nextProgress);
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

  const angle = progress * 180;
  const activeIndex = Math.min(
    2,
    Math.floor((angle + 0.001) / 90)
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Explore IETE Students’ Forum"
      className="relative h-[260svh] bg-[#050A18] text-white"
    >
      <div className="sticky top-[138px] flex h-[calc(100svh-138px)] flex-col items-center justify-center overflow-hidden px-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(50%-19rem)] top-1/2 h-[28rem] w-[22rem] -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(50%+2rem)] top-1/2 h-[28rem] w-[22rem] -translate-y-1/2 rounded-full bg-violet-600/25 blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[7%] left-1/2 w-max -translate-x-1/2 select-none whitespace-nowrap text-[clamp(4rem,14vw,12rem)] font-semibold tracking-[-0.08em] text-blue-400/[0.08]"
        >
          IETE-SF
        </div>

        <div className="relative z-10 mb-7 flex items-center gap-3 text-[10px] font-medium tracking-[0.32em] text-slate-300 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]" />
          EXPLORE THE FORUM
        </div>

        <div
          className="relative z-10 w-full max-w-[560px]"
          style={{ perspective: "1800px" }}
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
                className="absolute inset-0 overflow-hidden bg-[#070B18] text-center"
                style={{
                  transform: `rotateX(${-index * 90}deg) translateZ(min(calc((100vw - 2.5rem) / 2), 280px))`,
                  backfaceVisibility: "hidden",
                  boxShadow: "none",
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center px-7 py-10 sm:px-12">
                  <div
                    className={`mb-8 grid h-[76px] w-[76px] place-items-center bg-gradient-to-br ${
                      segment.accent === "violet"
                        ? "from-violet-500/25 to-fuchsia-500/5"
                        : segment.accent === "blue"
                          ? "from-blue-500/25 to-cyan-500/5"
                          : "from-cyan-400/25 to-blue-500/5"
                    }`}
                  >
                    <span className="text-2xl font-light tracking-widest">
                      {segment.number}
                    </span>
                  </div>

                  <p className="text-[10px] font-medium tracking-[0.25em] text-cyan-200 sm:text-xs">
                    {segment.eyebrow}
                  </p>

                  <h2 className="mt-5 max-w-[440px] text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                    {segment.title}
                  </h2>

                  <p className="mt-5 max-w-[380px] text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                    {segment.description}
                  </p>

                  <div className="mt-8 h-1 w-20 bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-500" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-8 flex items-center gap-3">
          {segments.map((segment, index) => (
            <span
              key={segment.number}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-9 bg-cyan-200"
                  : "w-3 bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* <p className="relative z-10 mt-4 text-[10px] tracking-[0.25em] text-slate-500 sm:text-xs">
          SCROLL TO EXPLORE
        </p> */}
      </div>
    </section>
  );
}
