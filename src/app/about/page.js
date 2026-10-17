"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  HomeIcon,
  Info,
  UsersRound,
  GraduationCap,
  CalendarDays,
  Layers3,
  Mail,
  LogIn,
  Rocket,
  Trophy,
  BookOpen,
  FileCheck,
  ChevronDown,
  MapPin,
  Globe,
  Users,
  Award,
} from "lucide-react";

/* ────────────────────────────────────────────
   Intersection-observer hook for scroll reveals
   ──────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ────────────────────────────────────────────
   Stagger-children wrapper
   ──────────────────────────────────────────── */
function RevealGroup({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   Animated counter for stats
   ──────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
/* ────────────────────────────────────────────
   Official IETE Centres & Sub-Centres Coordinates
   (Slightly nudged inland for coastal cities so dots sit cleanly inside borders)
   ──────────────────────────────────────────── */
const IETE_CENTRES = [
  { id: 1, name: "Bengaluru", coords: [77.5946, 12.9716], url: "https://www.ietebangalore.org/" },
  { id: 2, name: "Bhopal", coords: [77.4126, 23.2599], url: "https://ieteb.org/" },
  { id: 3, name: "Chandigarh", coords: [76.7794, 30.7333], url: "http://www.ietechandigarh.org/" },
  { id: 4, name: "Chennai", coords: [80.12, 13.0827], url: "http://ietechennai.in/" },
  { id: 5, name: "Delhi", coords: [77.15, 28.65], url: "https://ietedelhi.com/" },
  { id: 6, name: "Hyderabad", coords: [78.4867, 17.385], url: "https://www.ietehyd.org/" },
  { id: 7, name: "Kolkata", coords: [88.32, 22.5726] },
  { id: 8, name: "Mumbai", coords: [73.02, 19.12] },
  { id: 9, name: "Noida", coords: [77.45, 28.5355], url: "http://ietenoida.org/" },
  { id: 10, name: "Pune", coords: [73.8567, 18.5204] },
  { id: 11, name: "Ahmedabad", coords: [72.5714, 23.0225] },
  { id: 12, name: "Aligarh", coords: [78.088, 27.8974] },
  { id: 13, name: "Allahabad (Prayagraj)", coords: [81.8463, 25.4358] },
  { id: 14, name: "Amravati", coords: [77.7523, 20.932], url: "http://www.ieteamravati.org/" },
  { id: 15, name: "Aurangabad", coords: [75.3433, 19.8762] },
  { id: 16, name: "Bhubaneshwar", coords: [85.75, 20.2961] },
  { id: 17, name: "Coimbatore", coords: [76.9558, 11.0168] },
  { id: 18, name: "Dehradun", coords: [78.0322, 30.3165] },
  { id: 19, name: "Erode", coords: [77.7172, 11.341] },
  { id: 20, name: "Guwahati", coords: [91.7362, 26.1445] },
  { id: 21, name: "Kalaburagi (Gulbarga)", coords: [76.8343, 17.3297], url: "http://ieteklb.org/" },
  { id: 22, name: "Imphal", coords: [93.9063, 24.817] },
  { id: 23, name: "Jaipur", coords: [75.7873, 26.9124] },
  { id: 24, name: "Kanpur", coords: [80.3319, 26.4499] },
  { id: 25, name: "Kochi", coords: [76.38, 10.02], url: "https://ietekochi.in/" },
  { id: 26, name: "Kakinada", coords: [82.12, 17.02] },
  { id: 27, name: "Lucknow", coords: [80.9462, 26.8467] },
  { id: 28, name: "Mankapur", coords: [82.228, 27.037] },
  { id: 29, name: "Mysuru", coords: [76.6394, 12.2958] },
  { id: 30, name: "Nagpur", coords: [79.0882, 21.1458] },
  { id: 31, name: "Navi Mumbai", coords: [73.18, 19.033] },
  { id: 32, name: "Palakkad", coords: [76.6548, 10.7867] },
  { id: 33, name: "Pilani", coords: [75.6033, 28.367] },
  { id: 34, name: "Rajkot", coords: [70.8022, 22.3039], url: "http://www.ieterajkot.org/" },
  { id: 35, name: "Ranchi", coords: [85.3096, 23.3441] },
  { id: 36, name: "Shivamogga", coords: [75.5681, 13.9299] },
  { id: 37, name: "Sivakasi", coords: [77.795, 9.4533], url: "http://www.mepcoeng.ac.in/" },
  { id: 38, name: "Thiruvananthapuram", coords: [77.02, 8.62], url: "http://www.ietetvm.org/" },
  { id: 39, name: "Tirupati", coords: [79.4192, 13.6288], url: "https://www.ietetirupati.org/" },
  { id: 40, name: "Vadodara", coords: [73.1812, 22.3072] },
  { id: 41, name: "Vijayawada", coords: [80.648, 16.5062] },
  { id: 42, name: "Visakhapatnam", coords: [83.12, 17.72] },
  { id: 43, name: "Warangal", coords: [79.5941, 17.9689] },
  { id: 45, name: "Patna", coords: [85.1376, 25.5941], url: "http://www.ietepatna.in/" },
  { id: 46, name: "BIT Sindri (Dhanbad)", coords: [86.4735, 23.6546], highlight: true },
];

const IETE_SUB_CENTRES = [
  { name: "Agra", coords: [78.0081, 27.1767] },
  { name: "Burdwan", coords: [87.8615, 23.2324] },
  { name: "Dharwad", coords: [75.0078, 15.4589] },
  { name: "Goa", coords: [74.02, 15.38] },
  { name: "Gwalior", coords: [78.1828, 26.2183] },
  { name: "Indore", coords: [75.8577, 22.7196] },
  { name: "Jabalpur", coords: [79.9864, 23.1815] },
  { name: "Jalandhar", coords: [75.5762, 31.326] },
  { name: "Jammu", coords: [74.857, 32.7266] },
  { name: "Kolhapur", coords: [74.2433, 16.705] },
  { name: "Kozhikode", coords: [75.88, 11.2588] },
  { name: "Mhow", coords: [75.7644, 22.5524] },
  { name: "Nashik", coords: [73.7898, 19.9975] },
  { name: "Shimla", coords: [77.1734, 31.1048] },
  { name: "Surat", coords: [72.92, 21.1702] },
  { name: "Varanasi", coords: [82.9739, 25.3176] },
  { name: "Yavatmal", coords: [78.1204, 20.3888] },
];

function GlowingIndiaMap() {
  const [paths, setPaths] = useState([]);
  const [centres, setCentres] = useState([]);
  const [subCentres, setSubCentres] = useState([]);
  const [showSubCentres, setShowSubCentres] = useState(false);
  const [activeHub, setActiveHub] = useState(null);

  useEffect(() => {
    let active = true;

    fetch(
      "https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson"
    )
      .then((res) => res.json())
      .then((geo) => {
        if (!active) return;

        // Filter out island territories so mainland matches the clean reference silhouette
        const mainland = geo.features.filter((f) => {
          const name = (f.properties?.ST_NM || "").toLowerCase();
          return !name.includes("andaman") && !name.includes("lakshadweep");
        });

        // Compute exact bounding box directly in lon/lat with cosine latitude aspect correction
        let minLon = Infinity,
          maxLon = -Infinity,
          minLat = Infinity,
          maxLat = -Infinity;

        const scan = (ring) => {
          for (let i = 0; i < ring.length; i++) {
            const [lon, lat] = ring[i];
            if (lon < minLon) minLon = lon;
            if (lon > maxLon) maxLon = lon;
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
          }
        };

        mainland.forEach((f) => {
          const { type, coordinates } = f.geometry;
          if (type === "Polygon") coordinates.forEach(scan);
          else if (type === "MultiPolygon")
            coordinates.forEach((poly) => poly.forEach(scan));
        });

        const width = 800;
        const height = 880;
        const pad = 55;
        const cosLat = Math.cos(((minLat + maxLat) / 2) * (Math.PI / 180));

        const spanX = (maxLon - minLon) * cosLat;
        const spanY = maxLat - minLat;

        const scale = Math.min(
          (width - pad * 2) / spanX,
          (height - pad * 2) / spanY
        );

        const offsetX = (width - spanX * scale) / 2;
        const offsetY = (height - spanY * scale) / 2;

        // Single unified projection function for both state polygons and city coordinates
        const project = ([lon, lat]) => {
          const x = offsetX + (lon - minLon) * cosLat * scale;
          const y = height - (offsetY + (lat - minLat) * scale);
          return [x, y];
        };

        const ringsToSvg = (rings) =>
          rings
            .map(
              (ring) =>
                "M" +
                ring
                  .map((pt) => {
                    const [x, y] = project(pt);
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                  })
                  .join("L") +
                "Z"
            )
            .join(" ");

        setPaths(
          mainland.map((f, idx) => {
            const { type, coordinates } = f.geometry;
            const d =
              type === "Polygon"
                ? ringsToSvg(coordinates)
                : coordinates.map((p) => ringsToSvg(p)).join(" ");
            return { id: idx, d };
          })
        );

        setCentres(
          IETE_CENTRES.map((c) => {
            const [cx, cy] = project(c.coords);
            return { ...c, cx, cy, type: "IETE Centre" };
          })
        );

        setSubCentres(
          IETE_SUB_CENTRES.map((sc) => {
            const [cx, cy] = project(sc.coords);
            return { ...sc, cx, cy, type: "IETE Sub-Centre" };
          })
        );
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-[680px] flex-col items-center select-none">
      {/* Subtle Toggle Pill for Centres vs Sub-Centres */}
      <div className="mb-4 flex items-center gap-3 rounded-full border border-white/10 bg-[#050914]/90 px-4 py-1.5 text-xs text-slate-300 backdrop-blur-md">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_#60a5fa]" />
          44 Centres
        </span>
        <span className="text-white/20">|</span>
        <button
          type="button"
          onClick={() => setShowSubCentres(!showSubCentres)}
          className={`flex items-center gap-1.5 transition-colors ${
            showSubCentres ? "text-cyan-300" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              showSubCentres ? "bg-cyan-400" : "bg-slate-600"
            }`}
          />
          {showSubCentres ? "Hide" : "Show"} 18 Sub-Centres
        </button>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full">
        <svg
          viewBox="0 0 800 880"
          className="h-auto w-full overflow-visible"
        >
          <defs>
            {/* Clean Outer Silhouette Glow matching reference image */}
            <filter
              id="india-outer-glow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feMorphology
                operator="dilate"
                radius="2"
                in="SourceAlpha"
                result="dilated"
              />
              <feGaussianBlur
                stdDeviation="1.5"
                in="dilated"
                result="blurCore"
              />
              <feFlood
                floodColor="#93c5fd"
                floodOpacity="1"
                result="colorCore"
              />
              <feComposite
                in="colorCore"
                in2="blurCore"
                operator="in"
                result="glowCore"
              />

              <feGaussianBlur
                stdDeviation="6"
                in="dilated"
                result="blurMid"
              />
              <feFlood
                floodColor="#3b82f6"
                floodOpacity="0.9"
                result="colorMid"
              />
              <feComposite
                in="colorMid"
                in2="blurMid"
                operator="in"
                result="glowMid"
              />

              <feGaussianBlur
                stdDeviation="15"
                in="dilated"
                result="blurWide"
              />
              <feFlood
                floodColor="#1d4ed8"
                floodOpacity="0.7"
                result="colorWide"
              />
              <feComposite
                in="colorWide"
                in2="blurWide"
                operator="in"
                result="glowWide"
              />

              <feMerge>
                <feMergeNode in="glowWide" />
                <feMergeNode in="glowMid" />
                <feMergeNode in="glowCore" />
              </feMerge>
            </filter>

            {/* Radial Glow Gradient for Nodes (Cleaner & sharper than heavy blur filters) */}
            <radialGradient id="node-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="28%" stopColor="#93c5fd" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#3b82f6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="subnode-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* LAYER 1: Outer Silhouette Neon Glow */}
          <g filter="url(#india-outer-glow)">
            {paths.map((p) => (
              <path
                key={`glow-${p.id}`}
                d={p.d}
                fill="#040d1f"
                stroke="#60a5fa"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* LAYER 2: Inner State Polygons & Crisp Subtle Borders */}
          <g>
            {paths.map((p) => (
              <path
                key={`state-${p.id}`}
                d={p.d}
                fill="#040d1f"
                stroke="#153866"
                strokeWidth="0.9"
                strokeLinejoin="round"
                className="transition-colors duration-300 hover:fill-[#071936]"
              />
            ))}
          </g>

          {/* LAYER 3: Optional Sub-Centres (18 Nodes) */}
          {showSubCentres && (
            <g>
              {subCentres.map((sc) => (
                <g
                  key={`sub-${sc.name}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveHub(sc)}
                  onMouseLeave={() => setActiveHub(null)}
                >
                  <circle
                    cx={sc.cx}
                    cy={sc.cy}
                    r={7.5}
                    fill="url(#subnode-halo)"
                  />
                  <circle cx={sc.cx} cy={sc.cy} r={1.8} fill="#a5f3fc" />
                </g>
              ))}
            </g>
          )}

          {/* LAYER 4: Main IETE Centres (44 Nodes + BIT Sindri) */}
          <g>
            {centres.map((hub) => (
              <g
                key={`centre-${hub.name}`}
                className="cursor-pointer"
                onMouseEnter={() => setActiveHub(hub)}
                onMouseLeave={() => setActiveHub(null)}
                onClick={() => {
                  if (hub.url) window.open(hub.url, "_blank", "noopener");
                }}
              >
                {/* Radial soft glow */}
                <circle
                  cx={hub.cx}
                  cy={hub.cy}
                  r={hub.highlight ? 15 : 10.5}
                  fill="url(#node-halo)"
                />
                {/* Crisp white star center */}
                <circle
                  cx={hub.cx}
                  cy={hub.cy}
                  r={hub.highlight ? 3.2 : 2.3}
                  fill="#ffffff"
                />
              </g>
            ))}
          </g>
        </svg>

        {/* Minimal Floating Tooltip on Hover */}
        {activeHub && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-blue-400/30 bg-[#050b18]/95 px-3 py-1.5 text-center shadow-lg backdrop-blur-md"
            style={{
              left: `${(activeHub.cx / 800) * 100}%`,
              top: `${(activeHub.cy / 880) * 100 - 1.5}%`,
            }}
          >
            <p className="whitespace-nowrap text-xs font-bold tracking-wide text-white">
              {activeHub.name}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-cyan-300/80">
              {activeHub.type} {activeHub.url ? "• Click to visit ↗" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
/* ────────────────────────────────────────────
   IETE National Body — parent org highlight
   ──────────────────────────────────────────── */
function SparkleIcon({ className = "h-3 w-3" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

function NationalBodyPulseLine({ draw }) {
  const path = "M 24 22 H 168 L 188 34 H 212 L 232 22 H 376";

  return (
    <svg
      viewBox="0 0 400 44"
      className="mx-auto mt-10 h-9 w-full max-w-md sm:max-w-lg"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nb-pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.15" />
          <stop offset="35%" stopColor="#60a5fa" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
          <stop offset="65%" stopColor="#60a5fa" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.15" />
        </linearGradient>
        <filter id="nb-pulse-glow" x="-20%" y="-80%" width="140%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={path}
        stroke="url(#nb-pulse-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        filter="url(#nb-pulse-glow)"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: draw ? 0 : 1,
          transition: "stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {[
        { cx: 128, cy: 22, delay: "0s" },
        { cx: 200, cy: 34, delay: "0.35s" },
        { cx: 232, cy: 22, delay: "0.7s" },
      ].map(({ cx, cy, delay }) => (
        <g key={`${cx}-${cy}`} opacity={draw ? 1 : 0} style={{ transition: "opacity 0.6s ease", transitionDelay: delay }}>
          <circle cx={cx} cy={cy} r="5" fill="#3b82f6" opacity="0.25">
            <animate attributeName="r" values="5;8;5" dur="2.8s" repeatCount="indefinite" begin={delay} />
            <animate attributeName="opacity" values="0.25;0;0.25" dur="2.8s" repeatCount="indefinite" begin={delay} />
          </circle>
          <circle cx={cx} cy={cy} r="2.5" fill="#93c5fd">
            <animate attributeName="opacity" values="0.65;1;0.65" dur="2.8s" repeatCount="indefinite" begin={delay} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function NationalBodyInfoCard() {
  const cardRef = useRef(null);
  const [ref, visible] = useReveal(0.14);
  const [spot, setSpot] = useState({ x: 50, y: 40, active: false });

  const handlePointerMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  return (
    <div
      ref={ref}
      className={`mx-auto mt-10 max-w-4xl transition-all duration-700 ease-out sm:mt-12 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div
        ref={cardRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={() => setSpot((s) => ({ ...s, active: false }))}
        className="group relative rounded-[1.35rem] p-[1px] transition-transform duration-500 ease-out hover:-translate-y-1.5 sm:rounded-[1.65rem]"
      >
        {/* Soft outer halo — matches reference glow */}
        <div
          className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-blue-500/20 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80 sm:-inset-4"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-[1.35rem] bg-gradient-to-b from-blue-400/35 via-cyan-400/15 to-blue-600/30 opacity-70 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-[1.65rem]"
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-[1.32rem] border border-white/[0.07] bg-[#080c18]/95 px-7 py-9 shadow-[0_24px_60px_-28px_rgba(15,80,200,0.45)] backdrop-blur-xl sm:rounded-[1.62rem] sm:px-11 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: spot.active
                ? `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(56, 189, 248, 0.09), transparent 72%)`
                : "radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.06), transparent 55%)",
            }}
          />

          <p className="relative z-10 text-center text-lg leading-relaxed text-slate-300 sm:text-xl sm:leading-relaxed">
            The Institution of Electronics and Telecommunication Engineers
            (IETE) stands as the{" "}
            <span className="font-semibold text-cyan-300 transition-colors duration-300 group-hover:text-cyan-200">
              National Apex Professional Body
            </span>{" "}
            for electronics, telecommunication, and information technology
            professionals in India.
          </p>

          <p className="relative z-10 mt-8 text-center text-lg leading-relaxed text-slate-300 sm:mt-9 sm:text-xl sm:leading-relaxed">
            With a prestigious legacy spanning seven decades, IETE has grown to
            encompass a thriving community of{" "}
            <span className="font-semibold text-cyan-300 transition-colors duration-300 group-hover:text-cyan-200">
              over 1,25,000 members
            </span>{" "}
            across{" "}
            <span className="font-semibold text-cyan-300 transition-colors duration-300 group-hover:text-cyan-200">
              64 centres
            </span>{" "}
            in India and abroad, driving technological advancement and
            professional excellence.
          </p>

          <NationalBodyPulseLine draw={visible} />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   ABOUT PAGE
   ════════════════════════════════════════════ */
/* ────────────────────────────────────────────
   Objective card — matches stat card language
   ──────────────────────────────────────────── */
function ObjectiveCard({ Icon, title, desc, index }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    spotX: 50,
    spotY: 50,
    hovered: false,
  });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 5;
    setStyle({ rotateX, rotateY, spotX: px, spotY: py, hovered: true });
  };

  const handleMouseLeave = () => {
    setStyle((prev) => ({ ...prev, rotateX: 0, rotateY: 0, hovered: false }));
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg) translateY(${
            style.hovered ? "-5px" : "0px"
          })`,
          transition: style.hovered
            ? "transform 120ms ease-out"
            : "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060B16]/90 p-8 text-left shadow-[0_12px_34px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md transition-[border-color,box-shadow] duration-500 hover:border-cyan-400/30 hover:shadow-[0_16px_48px_-12px_rgba(34,211,238,0.22)]"
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: style.hovered ? 1 : 0,
            background: `radial-gradient(280px circle at ${style.spotX}% ${style.spotY}%, rgba(56, 189, 248, 0.1), transparent 72%)`,
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-400/80 via-blue-400/50 to-transparent transition-transform duration-500 group-hover:scale-x-100"
          aria-hidden="true"
        />

        <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 border-l border-t border-white/15 transition-colors duration-300 group-hover:border-cyan-300/55" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-2 w-2 border-b border-r border-white/15 transition-colors duration-300 group-hover:border-cyan-300/55" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] tracking-[0.22em] text-slate-500 transition-colors duration-300 group-hover:text-cyan-300/85">
            0{index + 1} // GOAL
          </span>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-cyan-300/80 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-cyan-400/35 group-hover:bg-cyan-400/[0.08] group-hover:text-cyan-200 group-hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.45)]">
            <Icon size={21} strokeWidth={1.75} />
          </div>
        </div>

        <h3 className="relative z-10 mt-6 text-xl font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-cyan-50 sm:text-[1.35rem]">
          {title}
        </h3>
        <p className="relative z-10 mt-3 flex-1 text-base leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          {desc}
        </p>

        <div className="relative z-10 mt-6 h-[1.5px] w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full w-8 rounded-full bg-cyan-400/55 transition-all duration-700 ease-out group-hover:w-full group-hover:bg-cyan-300/75"
            style={{ transitionDelay: `${index * 40}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Hand-Crafted Interactive Floating Stat Card
   ──────────────────────────────────────────── */
function InteractiveStatCard({ Icon, target, suffix = "", label, sublabel, index }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    spotX: 50,
    spotY: 50,
    hovered: false,
  });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // Subtle 3D tilt (max 6 degrees so it feels natural and handcrafted)
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 6;

    setStyle({ rotateX, rotateY, spotX: px, spotY: py, hovered: true });
  };

  const handleMouseLeave = () => {
    setStyle((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      hovered: false,
    }));
  };

  return (
    <div
      style={{
        perspective: "1000px",
        animation: `ieteFloat ${4.2 + index * 0.7}s ease-in-out infinite`,
        animationDelay: `${index * 0.4}s`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg) translateY(${
            style.hovered ? "-6px" : "0px"
          })`,
          transition: style.hovered
            ? "transform 120ms ease-out, border-color 300ms ease"
            : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), border-color 500ms ease",
        }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#060B16]/90 p-7 text-left shadow-[0_12px_34px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-[border-color,box-shadow] duration-500 hover:border-cyan-400/40 hover:shadow-[0_20px_50px_-14px_rgba(34,211,238,0.28)]"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-blue-400/60 to-transparent transition-transform duration-500 group-hover:scale-x-100"
          aria-hidden="true"
        />
        {/* Cursor-following soft spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: style.hovered ? 1 : 0,
            background: `radial-gradient(260px circle at ${style.spotX}% ${style.spotY}%, rgba(56, 189, 248, 0.11), transparent 75%)`,
          }}
        />

        {/* Hand-crafted minimal corner ticks */}
        <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 border-l border-t border-white/15 transition-colors duration-300 group-hover:border-cyan-300/60" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-2 w-2 border-b border-r border-white/15 transition-colors duration-300 group-hover:border-cyan-300/60" />

        {/* Top Row: Index number + Floating Icon */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.25em] text-slate-500 transition-colors duration-300 group-hover:text-cyan-300/80">
            0{index + 1} // STAT
          </span>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-slate-300 transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-300">
            <Icon size={19} strokeWidth={1.7} />
          </div>
        </div>

        {/* Middle Row: Big Clean Number */}
        <div className="relative z-10 my-6">
          <p className="text-4xl font-black tracking-tight text-white transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-cyan-50 sm:text-[42px]">
            <AnimatedCounter target={target} suffix={suffix} />
          </p>
        </div>

        {/* Bottom Row: Label + Animated underline */}
        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            {label}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">{sublabel}</p>

          <div className="mt-4 h-[1.5px] w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full w-8 rounded-full bg-cyan-400/60 transition-all duration-500 ease-out group-hover:w-full group-hover:bg-cyan-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flyingSocial, setFlyingSocial] = useState(null);
  const [footerEmail, setFooterEmail] = useState("");

  /* ── Objectives data ── */
  const objectives = [
    {
      Icon: Rocket,
      title: "Advancement of Technology",
      desc: "Promoting the advancement of Electronics, Telecommunications, and Information Technology sciences.",
    },
    {
      Icon: Trophy,
      title: "Leadership & Development",
      desc: "Fostering professional excellence and contributing to national development through technological leadership.",
    },
    {
      Icon: BookOpen,
      title: "Knowledge Dissemination",
      desc: "Organizing conferences, publishing journals, and facilitating continuing education programs.",
    },
    {
      Icon: FileCheck,
      title: "Professional Examinations",
      desc: "Conducting AMIETE and DIPIETE examinations to certify professional competence in the field.",
    },
  ];

  const nationwideStats = [
    {
      Icon: Globe,
      target: 64,
      suffix: "+",
      label: "Centres Across India",
      sublabel: "Active chapters & sub-centres",
    },
    {
      Icon: Users,
      target: 125000,
      suffix: "+",
      label: "Members Nationwide",
      sublabel: "Students, researchers & engineers",
    },
    {
      Icon: Award,
      target: 70,
      suffix: "+",
      label: "Years of Excellence",
      sublabel: "Established legacy since 1953",
    },
  ];

  /* ── Faculty ── */
  const faculty = [
    {
      name: "Prof. (Dr.) Pankaj Rai",
      role: "Our Patron",
      desc: "Guiding the institution with wisdom and vision towards excellence in technical education.",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      name: "Prof. Imteyaz Ahmed",
      role: "Professor In-Charge",
      desc: "Leading day-to-day operations and ensuring the highest standards of academic excellence.",
      gradient: "from-violet-400 to-indigo-500",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#070B18] text-white">
      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed left-1/2 top-3 z-50 mt-3 flex min-h-[88px] w-[calc(100%-32px)] max-w-[1450px] -translate-x-1/2 items-center justify-between rounded-[24px] border border-white/[0.13] bg-[#080B12]/45 px-5 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="IETE-SF Home"
          className="relative z-10 flex shrink-0 items-center"
        >
          <img
            src="/logo.svg"
            alt="IETE-SF"
            className="h-[60px] w-[60px] object-contain"
          />
        </Link>

        {/* Centered desktop navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:flex 2xl:gap-7">
          {[
            { label: "Home", href: "/", Icon: HomeIcon },
            { label: "About", href: "/about", Icon: Info },
            { label: "Members", href: "/members", Icon: UsersRound },
            { label: "Alumni", href: "/alumni", Icon: GraduationCap },
            { label: "Events", href: "/events", Icon: CalendarDays },
            { label: "Domains", href: "/domains", Icon: Layers3 },
            { label: "Contact", href: "/contact", Icon: Mail },
          ].map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              className={`group relative flex items-center gap-2.5 whitespace-nowrap py-3 text-[15px] font-medium tracking-wide transition-colors duration-300 ${
                label === "About"
                  ? "text-cyan-300"
                  : "text-slate-200/90 hover:text-cyan-300"
              }`}
            >
              <Icon
                size={19}
                strokeWidth={1.8}
                className={`transition-transform duration-300 group-hover:-translate-y-0.5 ${
                  label === "About"
                    ? "text-cyan-300"
                    : "group-hover:text-cyan-300"
                }`}
              />
              <span>{label}</span>
              <span
                className={`absolute bottom-0 left-0 h-px bg-cyan-300 transition-all duration-300 ${
                  label === "About"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Login */}
        <Link
          href="/login"
          className="relative z-10 hidden shrink-0 items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-cyan-300/40 hover:bg-cyan-300/[0.07] hover:text-cyan-200 sm:flex"
        >
          <LogIn size={18} strokeWidth={1.8} />
          Login
        </Link>

        {/* Mobile menu toggle */}
        <div className="relative z-10 ml-auto flex items-center gap-3 xl:hidden">
          <Link
            href="/login"
            aria-label="Member Login"
            className="rounded-xl border border-white/15 p-3 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-300 sm:hidden"
          >
            <LogIn size={20} />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-lg text-white transition hover:border-cyan-300/40 hover:text-cyan-300"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-2xl border border-white/10 bg-[#080B12]/95 p-3 shadow-2xl backdrop-blur-2xl xl:hidden">
            {[
              { label: "Home", href: "/", Icon: HomeIcon },
              { label: "About", href: "/about", Icon: Info },
              { label: "Members", href: "/members", Icon: UsersRound },
              { label: "Alumni", href: "/alumni", Icon: GraduationCap },
              { label: "Events", href: "/events", Icon: CalendarDays },
              { label: "Domains", href: "/domains", Icon: Layers3 },
              { label: "Contact", href: "/contact", Icon: Mail },
            ].map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition ${
                  label === "About"
                    ? "bg-cyan-300/[0.07] text-cyan-200"
                    : "text-slate-200 hover:bg-cyan-300/[0.07] hover:text-cyan-200"
                }`}
              >
                <Icon size={19} strokeWidth={1.8} />
                {label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-xl border border-cyan-300/20 px-4 py-3.5 text-sm text-cyan-100"
            >
              <LogIn size={19} />
              Member Login
            </Link>
          </div>
        )}
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-20 pt-36">
        {/* Background layers */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 43%, rgba(15, 91, 220, 0.20) 0%, rgba(12, 39, 91, 0.13) 30%, transparent 62%),
              radial-gradient(ellipse at 50% 100%, rgba(13, 53, 115, 0.14) 0%, transparent 55%),
              linear-gradient(135deg, #0b1020 0%, #070b17 48%, #03050b 100%)
            `,
          }}
        />

        {/* Grid pattern */}
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

        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-[43%] -z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.08] blur-[100px] sm:h-[480px] sm:w-[480px]" />

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
          <RevealGroup delay={0}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              <Info size={14} />
              About Us
            </div>
          </RevealGroup>

          <RevealGroup delay={100}>
            <h1 className="mt-4 text-4xl font-black uppercase leading-tight tracking-[0.04em] sm:text-6xl md:text-7xl">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                About{" "}
              </span>
              <span className="bg-gradient-to-b from-cyan-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
                IETE
              </span>
            </h1>
          </RevealGroup>

          <RevealGroup delay={200}>
            <div className="mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent sm:w-36" />
          </RevealGroup>

          <RevealGroup delay={300}>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed">
              The Institution of Electronics and Telecommunication Engineers
              (IETE) is India&apos;s leading recognised professional society
              devoted to the advancement of science and technology of
              Electronics, Telecommunication &amp; IT.{" "}
              <span className="font-semibold text-cyan-300">
                Founded in 1953.
              </span>
            </p>
          </RevealGroup>

          <RevealGroup delay={400}>
            <a
              href="#national-body"
              className="mt-14 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-slate-500 transition-colors hover:text-blue-300"
            >
              <span className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-600 p-1.5">
                <span className="h-2 w-1 animate-bounce rounded-full bg-blue-300" />
              </span>
              Explore
            </a>
          </RevealGroup>
        </div>
      </section>

      {/* ═══ NATIONAL BODY SECTION ═══ */}
      <section
        id="national-body"
        className="relative overflow-hidden px-5 py-24 sm:py-36"
      >
        <style>{`
          @keyframes parentBadgeGlow {
            0%, 100% { opacity: 0.55; transform: scale(1); }
            50% { opacity: 0.85; transform: scale(1.04); }
          }
        `}</style>

        <div className="pointer-events-none absolute -left-40 top-16 h-[480px] w-[480px] rounded-full bg-blue-600/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-[380px] w-[380px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />
        <div className="pointer-events-none absolute left-1/2 top-[38%] h-[280px] w-[min(92vw,720px)] -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[90px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <RevealGroup>
            <div className="relative flex justify-center">
              <div
                className="pointer-events-none absolute h-14 w-48 rounded-full bg-cyan-400/25 blur-2xl"
                style={{ animation: "parentBadgeGlow 4s ease-in-out infinite" }}
                aria-hidden="true"
              />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                <SparkleIcon className="h-3.5 w-3.5 shrink-0" />
                Our Parent Body
                <SparkleIcon className="h-3.5 w-3.5 shrink-0" />
              </span>
            </div>
          </RevealGroup>

          <RevealGroup delay={100}>
            <h2 className="mt-6 text-center text-4xl font-black uppercase leading-tight tracking-[0.04em] sm:mt-7 sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                IETE National Body
              </span>
            </h2>
          </RevealGroup>

          <RevealGroup delay={160}>
            <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent sm:w-36" />
          </RevealGroup>

          <NationalBodyInfoCard />
        </div>
      </section>

      {/* ═══ OBJECTIVES SECTION ═══ */}
      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-blue-600/[0.05] blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-cyan-500/[0.04] blur-[100px]" />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(82, 137, 220, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(82, 137, 220, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <RevealGroup>
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.05] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                <Layers3 size={14} />
                Our Mission
              </span>
            </div>
          </RevealGroup>

          <RevealGroup delay={100}>
            <h2 className="mt-6 text-center text-4xl font-black uppercase leading-tight tracking-[0.04em] sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Objective of IETE
              </span>
            </h2>
          </RevealGroup>

          <RevealGroup delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-slate-400 sm:text-xl">
              Driving excellence in electronics, telecommunications, and IT
              across the country.
            </p>
          </RevealGroup>

          <RevealGroup delay={200}>
            <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent sm:w-36" />
          </RevealGroup>

          <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2">
            {objectives.map((obj, i) => (
              <RevealGroup key={obj.title} delay={280 + i * 100}>
                <ObjectiveCard
                  index={i}
                  Icon={obj.Icon}
                  title={obj.title}
                  desc={obj.desc}
                />
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FACULTY / LEADERS SECTION ═══ */}
      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/[0.04] blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <RevealGroup>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-violet-400/70">
              Meet Our Leaders
            </p>
          </RevealGroup>

          <RevealGroup delay={100}>
            <h2 className="mt-4 text-center text-3xl font-black uppercase tracking-wide sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Our Support
              </span>
            </h2>
          </RevealGroup>

          <RevealGroup delay={150}>
            <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-violet-400 to-transparent sm:w-28" />
          </RevealGroup>

          {/* Faculty cards */}
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {faculty.map((person, i) => (
              <RevealGroup key={person.name} delay={250 + i * 150}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center transition-all duration-500 hover:border-white/[0.15]">
                  {/* Top gradient line */}
                  <div
                    className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${person.gradient} opacity-60 transition-opacity group-hover:opacity-100`}
                  />

                  {/* Avatar placeholder */}
                  <div
                    className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${person.gradient} shadow-lg shadow-cyan-500/10`}
                  >
                    <Users size={36} className="text-white/90" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
                    {person.role}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                    {person.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {person.desc}
                  </p>
                </div>
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NATIONWIDE PRESENCE SECTION ═══ */}
      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        <style>{`
          @keyframes ieteFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
          }
        `}</style>

        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.06] blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <RevealGroup delay={100}>
            <h2 className="text-4xl font-black uppercase leading-tight tracking-[0.04em] sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                IETE is All Around India
              </span>
            </h2>
          </RevealGroup>

          <RevealGroup delay={180}>
            <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent sm:w-36" />
          </RevealGroup>

          <RevealGroup delay={250}>
            <div className="mt-8 sm:mt-12">
              <GlowingIndiaMap />
            </div>
          </RevealGroup>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {nationwideStats.map((item, i) => (
              <RevealGroup key={item.label} delay={380 + i * 110}>
                <InteractiveStatCard
                  index={i}
                  Icon={item.Icon}
                  target={item.target}
                  suffix={item.suffix}
                  label={item.label}
                  sublabel={item.sublabel}
                />
              </RevealGroup>
            ))}
          </div>
        </div>
      </section>
      {/* ═══ FOOTER ═══ */}
      <footer className="iete-footer">
        <div className="iete-footer-glow" />

        <div className="relative z-10 mx-auto max-w-[1450px] px-6 sm:px-10 lg:px-12">
          {/* Brand and social links */}
          <div className="iete-footer-top">
            <Link
              href="/"
              className="iete-footer-brand"
              aria-label="IETE-SF Home"
            >
              <img src="/logo.svg" alt="IETE-SF logo" />
              <span>
                IETE<span className="iete-brand-dot"></span>
              </span>
            </Link>

            <div className="iete-socials">
              {[
                {
                  name: "Facebook",
                  href: "https://www.facebook.com/ietebits",
                  color: "#1877F2",
                  icon: (
                    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V13h2.8v8z" />
                  ),
                },
                {
                  name: "X",
                  href: "https://x.com/IETE_BITS",
                  color: "#E5E7EB",
                  icon: (
                    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.3L5.7 22H2.5l7.3-8.4L2 2h6.5l4.4 6.7zM17.8 20h1.7L7.4 3.9H5.6z" />
                  ),
                },
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/ietebits/",
                  color: "#E879F9",
                  icon: (
                    <>
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="17.6" cy="6.7" r="1.2" />
                    </>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/search/results/all/?keywords=IETE%20Students%27%20Forum%20BIT%20Sindri&origin=RICH_QUERY_SUGGESTION&heroEntityKey=urn%3Ali%3Aorganization%3A42721036&position=0",
                  color: "#0A66C2",
                  icon: (
                    <path d="M5 8.5H2V22h3zM3.5 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6M22 13.8c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V8.5H10V22h3v-7.1c0-1.9.4-3.7 2.7-3.7s2.3 2.1 2.3 3.8V22h3z" />
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={`Visit IETE-SF on ${social.name}`}
                  className={`iete-social-link ${
                    flyingSocial === social.name ? "iete-social-fly" : ""
                  }`}
                  style={{ "--social-color": social.color }}
                  onClick={(event) => {
                    event.preventDefault();
                    if (
                      window.matchMedia("(prefers-reduced-motion: reduce)")
                        .matches
                    ) {
                      window.location.href = social.href;
                      return;
                    }
                    setFlyingSocial(social.name);
                    window.setTimeout(() => {
                      window.location.href = social.href;
                    }, 650);
                  }}
                >
                  <span className="iete-social-trail" />
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}

              <a
                href="https://iete-induction-26.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="iete-join-footer"
              >
                Join Us <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Footer information */}
          <div className="iete-footer-grid">
            <div className="iete-footer-column">
              <h3>IETE</h3>
              <nav className="iete-footer-links" aria-label="Footer navigation">
                <Link href="/">Home</Link>
                <Link href="/contact">Contact us</Link>
                <Link href="/about">About us</Link>
                <Link href="/events">Events</Link>
              </nav>
            </div>

            <div className="iete-footer-column">
              <h3>FIND US</h3>
              <address>
                BIT Sindri
                <br />
                Dhanbad, Jharkhand
                <br />
                India
              </address>
            </div>

            <div className="iete-footer-column">
              <h3>CONTACT US</h3>
              <div className="iete-footer-links">
                <a href="mailto:ietebits@gmail.com">ietebits@gmail.com</a>
                <a href="tel:+919890474518">+91-9890474518</a>
                <a href="tel:+919546003148">+91-9546003148</a>
              </div>
            </div>

            <div className="iete-footer-column">
              <h3>GET IN TOUCH</h3>
              <p className="iete-footer-note">
                Have something to share? Send us a message.
              </p>

              <form
                className="iete-mail-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  const subject = encodeURIComponent("Hello IETE-SF");
                  const body = encodeURIComponent(
                    `My email address: ${footerEmail}\n\n`
                  );
                  window.location.href = `mailto:ietebits@gmail.com?subject=${subject}&body=${body}`;
                }}
              >
                <label className="sr-only" htmlFor="iete-about-footer-email">
                  Your email address
                </label>
                <input
                  id="iete-about-footer-email"
                  type="email"
                  value={footerEmail}
                  onChange={(event) => setFooterEmail(event.target.value)}
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                <button type="submit">
                  Send <span aria-hidden="true">↗</span>
                </button>
              </form>
              <p className="iete-footer-note iete-mail-hint">
                Opens your default email application.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="iete-footer-bottom">
            <p>Copyright © 2026 IETE-SF. All rights reserved.</p>
            <p>Designed &amp; Developed by: Team IETE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
