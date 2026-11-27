
"use client";

import dynamic from "next/dynamic";

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] items-center justify-center rounded-2xl bg-[#080D19] text-sm text-slate-400">
      Loading map...
    </div>
  ),
});

export default function LeafletMap() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#080D19] shadow-[0_15px_50px_rgba(0,0,0,0.25)]">
      <MapContent />

      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white">
            BIT Sindri
          </p>
          <p className="text-xs text-slate-400">
            Sindri, Dhanbad, Jharkhand
          </p>
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=23.6547,86.4737"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-xs font-semibold text-sky-300 transition hover:bg-sky-400/20"
        >
          Get directions ↗
        </a>
      </div>
    </div>
  );
}
