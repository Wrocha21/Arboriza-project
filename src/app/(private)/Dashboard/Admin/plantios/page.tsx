"use client";

import "@/Assets/css/components/adminSections.css";
import "@/Assets/css/global.css";
import "leaflet/dist/leaflet.css";

import dynamic from "next/dynamic";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { AuthProvider } from "@/app/context/AuthContext";

const MapWithNoSSR = dynamic(() => import("@/app/(public)/(map)/map"), {
  ssr: false,
  loading: () => (
    <div className="box-loadingCircleAndSucess">
      <CircleNotchIcon id="circleIcon" size={32} weight="fill" color="#green" />
    </div>
  ),
});

export function PlantiosContent() {
  return (
    <>
      <div className="containerPlantio">
        <div className="box-map">
          <MapWithNoSSR />
        </div>
      </div>
    </>
  );
}

export default function plantios() {
  return (
    <AuthProvider>
      <PlantiosContent></PlantiosContent>
    </AuthProvider>
  );
}
