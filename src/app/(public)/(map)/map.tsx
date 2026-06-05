"use client"; // Obrigatório no App Router

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/Assets/css/components/map.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { CaretLeftIcon, MapPinIcon, PlantIcon } from "@phosphor-icons/react";
import ModalAddPLant from "@/app/(private)/Components/ModalAddPlant";
import { auth } from "@/lib/auth/auth";

const icon = L.icon({
  iconUrl: "/Marker.svg",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
});

interface OvinteDeCliquesProps {
  aoClicar: (lat: number, lng: number) => void;
}
interface ChangeMapCenterProps {
  center: { lat: number; lng: number } | null;
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

function ChangeMapCenter({ center }: ChangeMapCenterProps) {
  const map = useMap();

  useEffect(() => {
    if (!center) return;

    // Se o formato for objeto { lat, lng }
    if (center.lat !== undefined && center.lng !== undefined) {
      map.setView([center.lat, center.lng], 16);
    }
    // Se o formato for array clássico [lat, lng]
    else if (Array.isArray(center) && center.length === 2) {
      map.setView([center[0], center[1]], 16);
    }
  }, [center, map]);

  return null;
}

export default function Map() {
  const position: [number, number] = [-22.7494, -42.8592]; // Exemplo: Itaboraí
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [coordenadas, setCoordenadas] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoordenadas({ lat: latitude, lng: longitude });
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        alert("Não foi possível obter sua localização atual.");
        setLoading(false);
      },
      { enableHighAccuracy: true }, // Força maior precisão (GPS)
    );
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
            <button className="btnMapLoc" onClick={handleGetLocation}>
              <MapPinIcon size={29} color="#ffffff" />
            </button>
            <button className="btnAddPlant">
              <PlantIcon width={50} height={50} weight="fill" color="green" />
              <span>
                DICA:Toque em qualquer local do mapa para registrar um plantio
              </span>
            </button>
          </div>
        )}

        <MapContainer
          key={isFullscreen ? "active-map" : "static-map"}
          center={[-22.7494, -42.8592]}
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
          {auth.currentUser !== null ? (
            <OvinteDeCliques aoClicar={handleCliqueNoMapa} />
          ) : (
            ""
          )}
          <Marker position={position} icon={icon}>
            <Popup>Um plantio foi realizado aqui! 🌱</Popup>
          </Marker>
          <ChangeMapCenter center={coordenadas} />

          <Circle
            center={coordenadas}
            radius={40} // O raio da zona em METROS (40 metros é um tamanho ideal para um zoom 16)
            pathOptions={{
              color: "#22c55e", // Cor da borda (Verde Tailwind ou a cor que preferir)
              fillColor: "#22c55e", // Cor do preenchimento interno
              fillOpacity: 0.15, // Opacidade bem sutil e transparente
              weight: 1, // Espessura da linha da borda
            }}
          />
        </MapContainer>
      </div>

      {modalAberto && (
        <ModalAddPLant
          setOpenMenu={setModalAberto}
          latitude={coordenadas.lat}
          longitude={coordenadas.lng}
        />
      )}
    </>
  );
}
