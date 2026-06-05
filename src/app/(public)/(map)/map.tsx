"use client"; // Obrigatório no App Router

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/Assets/css/components/map.css";
import Image from "next/image";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { CaretLeftIcon } from "@phosphor-icons/react";
import ModalAddPLant from "@/app/(private)/components/ModalAddPlant";
import addPlantIcon from "@/Assets/css/images/IconPlantAdd.svg";

const icon = L.icon({
  iconUrl: "/Marker.svg",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
});

interface OvinteDeCliquesProps {
  aoClicar: (lat: number, lng: number) => void;
}

function OvinteDeCliques({ aoClicar }: OvinteDeCliquesProps) {
  useMapEvents({
    click(e) {
      // e.latlng traz { lat: ..., lng: ... } nativo do Leaflet
      aoClicar(e.latlng.lat, e.latlng.lng);
    },
  });
  return null; // Este componente não renderiza nada visual, ele só "escuta"
}
export default function Map() {
  const position: [number, number] = [-22.7494, -42.8592]; // Exemplo: Itaboraí
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [coordenadas, setCoordenadas] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCliqueNoMapa = (lat: number, lng: number) => {
    setCoordenadas({ lat, lng });
    setModalAberto(true); // Abre o modal!
  };
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Dica: disparar um resize no window ajuda o Leaflet a reajustar os tiles
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  };

  return (
    <>
      <div
        className={`map-wrapper ${isFullscreen ? "is-fullscreen" : ""}`}
        onClick={!isFullscreen ? toggleFullscreen : undefined}
      >
        {isFullscreen && (
          <div className="box-infoMap">
            <button
              className="btnMapOpen"
              onClick={() => setIsFullscreen(false)}
            >
              <CaretLeftIcon size={29} color="#ffffff" />
            </button>
            <button className="btnAddPlant">
              <Image src={addPlantIcon} width={29} height={29} alt="" />
              <span>Adicionar Plantio</span>
            </button>
          </div>
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
          <OvinteDeCliques aoClicar={handleCliqueNoMapa} />
          <Marker position={position} icon={icon}>
            <Popup>Um plantio foi realizado aqui! 🌱</Popup>
          </Marker>
        </MapContainer>
      </div>

      {modalAberto && <ModalAddPLant setOpenMenu={setModalAberto} latitude={coordenadas.lat} longitude={coordenadas.lng}/>}
    </>
  );
}
