"use client";

import dynamic from "next/dynamic";
import "../../Assets/css/components/map.css";
import { useState } from "react";
const MapWithNoSSR = dynamic(() => import("../(public)/(map)/map"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "100px", width: "100px", background: "#f0f0f0" }}>
      Carregando mapa...
    </div>
  ),
});

export default function SectionMap() {
  const [openMap,setOpenMap] = useState(false)
  function HandleClickMap(){
    setOpenMap(true)
  }

 
  return (
    <>
      <div className="container-map" id="map">
        <div className="box-title">
          <span>Mapa da Arborização Urbana</span>
        </div>

        <div className={`map ${openMap ? 'map-active' : ''}`} onClick={HandleClickMap}>
          <MapWithNoSSR/>
        </div>
      </div>
    </>
  );
}
