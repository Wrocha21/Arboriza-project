"use client"; // Obrigatório no App Router

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Draggable } from "leaflet";
import { useState } from "react";
import { CaretLeftIcon } from "@phosphor-icons/react";

const icon = L.icon({
  iconUrl: "/Marker.svg",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const position: [number, number] = [-22.7494, -42.8592]; // Exemplo: Itaboraí
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Dica: disparar um resize no window ajuda o Leaflet a reajustar os tiles
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  };
  return (
    <div
      className={`map-wrapper ${isFullscreen ? "is-fullscreen" : ""}`}
      onClick={!isFullscreen ? toggleFullscreen : undefined}
    >
      {isFullscreen && (
        <button className="btnMapOpen" onClick={() => setIsFullscreen(false)}>
          <CaretLeftIcon size={29} color="#ffffff" />
        </button>
      )}
      <MapContainer
        key={isFullscreen ? "active-map" : "static-map"}
        center={position}
        zoom={13}
        dragging={isFullscreen}
        scrollWheelZoom={isFullscreen}
        doubleClickZoom={isFullscreen}
        zoomControl={false}
        touchZoom={isFullscreen}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>Um plantio foi realizado aqui! 🌱</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
