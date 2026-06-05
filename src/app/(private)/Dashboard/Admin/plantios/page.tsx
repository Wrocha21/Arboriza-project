"use client";

import "@/Assets/css/components/adminSections.css";
import "leaflet/dist/leaflet.css";

import { AuthProvider } from "@/app/context/AuthContext";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/app/(public)/(map)/map"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100px", width: "100px", background: "#f0f0f0" }}>
      Carregando mapa...
    </div>
  ),
});


export function PlantiosContent() {


  return (
    <>
      <div className="containerPlantio">
        <div className="box-map">
          <MapWithNoSSR/>
        </div>
      </div>
    </>
  );
}

export default function Plantios() {
  return (
    <AuthProvider>
      <PlantiosContent />
    </AuthProvider>
  );
}
