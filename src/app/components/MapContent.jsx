
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  AttributionControl,
} from "react-leaflet";

import L from "leaflet";

const bitIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 22px;
      height: 22px;
      background: #38bdf8;
      border: 4px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 12px #38bdf8, 0 0 28px #0ea5e9;
    "></div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export default function MapContent() {
  const position = [23.6547, 86.4737];

  return (
    <div className="h-[360px] w-full overflow-hidden">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <AttributionControl prefix={false} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          className="dark-map-tiles"
        />

        <Marker position={position} icon={bitIcon}>
          <Popup>
            <strong>BIT Sindri</strong>
            <br />
            Dhanbad, Jharkhand
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
