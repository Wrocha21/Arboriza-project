"use client"; // Obrigatório no App Router

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

const icon = L.icon({
  iconUrl: "/Marker.svg",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const position: [number, number] = [-22.7494, -42.8592]; // Exemplo: Itaboraí
  const [interactive, setInteractive] = useState(false);
  return (
    <MapContainer
      center={position}
      zoom={13}
      dragging={interactive}
      touchZoom={interactive}
      doubleClickZoom={interactive}
      scrollWheelZoom={interactive}
      boxZoom={interactive}
      keyboard={interactive}
      zoomControl={interactive}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>Um plantio foi realizado aqui! 🌱</Popup>
      </Marker>
    </MapContainer>
  );
}
