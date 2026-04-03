"use client";
import dynamic from "next/dynamic";

import "../Assets/css/components/map.css";
const MapWithNoSSR = dynamic(() => import("../(public)/(map)/map"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100px", width: "100px", background: "#f0f0f0" }}>
      Carregando mapa...
    </div>
  ),
});

export default function SectionMap() {
  return (
    <>
      <div className="container-map">
        <div className="box-title">
          <span>Mapa da Arborização Urbana</span>
        </div>
        
        <div className="map">
          <MapWithNoSSR />
        </div>
      </div>
    </>
  );
}
