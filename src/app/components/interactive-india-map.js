"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";

const DIRECTORY_URL = "https://www.iete.org/iete-centres-2/";

const centres = [
  { name: "Agra", position: [27.1767, 78.0081] },
  { name: "Kolkata", position: [22.5726, 88.3639] },
  { name: "Ahmedabad", position: [23.0225, 72.5714] },
  { name: "Kozhikode", position: [11.2588, 75.7804] },
  { name: "Aligarh", position: [27.8974, 78.0880] },
  { name: "Lucknow", position: [26.8467, 80.9462] },
  { name: "Allahabad", position: [25.4358, 81.8463] },
  { name: "Mankapur", position: [27.0300, 82.2300] },
  { name: "Ambala", position: [30.3782, 76.7767] },
  { name: "Mhow", position: [22.5570, 75.7560] },
  { name: "Amravati", position: [20.9374, 77.7796] },
  { name: "Mumbai", position: [19.0760, 72.8777] },
  { name: "Aurangabad", position: [19.8762, 75.3433] },
  { name: "Mysore", position: [12.2958, 76.6394] },
  { name: "Bangalore", position: [12.9716, 77.5946] },
  { name: "Nagpur", position: [21.1458, 79.0882] },
  { name: "Bhopal", position: [23.2599, 77.4126] },
  { name: "Nashik", position: [19.9975, 73.7898] },
  { name: "Bhubaneswar", position: [20.2961, 85.8245] },
  { name: "Navi Mumbai", position: [19.0330, 73.0297] },
  { name: "Burdwan", position: [23.2324, 87.8615] },
  { name: "Noida", position: [28.5355, 77.3910] },
  { name: "Chandigarh", position: [30.7333, 76.7794] },
  { name: "Chennai", position: [13.0827, 80.2707] },
  { name: "Palakkad", position: [10.7867, 76.6548] },
  { name: "Coimbatore", position: [11.0168, 76.9558] },
  { name: "Patna", position: [25.5941, 85.1376] },
  { name: "Dehradun", position: [30.3165, 78.0322] },
  { name: "Pilani", position: [28.3670, 75.6030] },
  { name: "Delhi", position: [28.6139, 77.2090] },
  { name: "Pune", position: [18.5204, 73.8567] },
  { name: "Dharwad", position: [15.4589, 75.0078] },
  { name: "Raipur", position: [21.2514, 81.6296] },
  { name: "Goa", position: [15.4909, 73.8278] },
  { name: "Rajkot", position: [22.3039, 70.8022] },
  { name: "Kalaburagi", position: [17.3297, 76.8343] },
  { name: "Ranchi", position: [23.3441, 85.3096] },
  { name: "Guwahati", position: [26.1445, 91.7362] },
  { name: "Erode", position: [11.3410, 77.7172] },
  { name: "Gwalior", position: [26.2183, 78.1828] },
  { name: "Sivakasi", position: [9.4533, 77.8024] },
  { name: "Hyderabad", position: [17.3850, 78.4867] },
  { name: "Shimla", position: [31.1048, 77.1734] },
  { name: "Imphal", position: [24.8170, 93.9368] },
  { name: "Shimoga", position: [13.9299, 75.5681] },
  { name: "Indore", position: [22.7196, 75.8577] },
  { name: "Surat", position: [21.1702, 72.8311] },
  { name: "Jabalpur", position: [23.1815, 79.9864] },
  { name: "Thiruvananthapuram", position: [8.5241, 76.9366] },
  { name: "Jaipur", position: [26.9124, 75.7873] },
  { name: "Tirupati", position: [13.6288, 79.4192] },
  { name: "Jalandhar", position: [31.3260, 75.5762] },
  { name: "Vadodara", position: [22.3072, 73.1812] },
  { name: "Jammu", position: [32.7266, 74.8570] },
  { name: "Varanasi", position: [25.3176, 82.9739] },
  { name: "Kakinada", position: [16.9891, 82.2475] },
  { name: "Vijayawada", position: [16.5062, 80.6480] },
  { name: "Kanpur", position: [26.4499, 80.3319] },
  { name: "Visakhapatnam", position: [17.6868, 83.2185] },
  { name: "Kathmandu", position: [27.7172, 85.3240] },
  { name: "Warangal", position: [17.9689, 79.5941] },
  { name: "Kochi", position: [9.9312, 76.2673] },
  { name: "Yavatmal", position: [20.3888, 78.1204] },
];

const markerIcon = L.divIcon({
  className: "iete-map-marker",
  html: `
    <div style="
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #AFC8EA;
      border: 3px solid #17263A;
      box-shadow: 0 0 0 4px rgba(175,200,234,.18), 0 0 14px rgba(145,178,223,.65);
    "></div>
  `,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export default function InteractiveIndiaMap() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B111A] p-2 shadow-2xl shadow-black/20 sm:p-3">
        <div className="h-[420px] overflow-hidden rounded-xl sm:h-[560px]">
          <MapContainer
            center={[22.8, 82.0]}
            zoom={4.6}
            minZoom={4}
            maxZoom={12}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {centres.map((centre) => (
              <Marker
                key={centre.name}
                position={centre.position}
                icon={markerIcon}
                eventHandlers={{
                  click: () => setSelected(centre),
                }}
              >
                <Popup>
                  <strong>IETE {centre.name}</strong>
                  <br />
                  <span>Click to view centre details below.</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-[#0B111A] p-5 text-left sm:p-6">
        {selected ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#91B2DF]">
                Selected IETE location
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {selected.name}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                IETE {selected.name} Centre
              </p>
            </div>

            <a
              href={DIRECTORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#91B2DF]/30 bg-[#91B2DF]/10 px-5 py-3 text-sm font-medium text-[#C5D8F2] transition hover:bg-[#91B2DF]/20"
            >
              View centre particulars
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#91B2DF]">
              Explore IETE locations
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Select a marker on the map
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Click or tap any marker to view its centre name and open the
              official IETE centre directory for further particulars.
            </p>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs leading-5 text-slate-500">
        Map markers indicate city-level locations, not verified office
        coordinates. Some locations may represent sub-centres.
      </p>
    </div>
  );
}