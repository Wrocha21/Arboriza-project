"use client"; // Obrigatório no App Router

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Circle,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "@/Assets/css/components/map.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { CaretLeftIcon, Plant, PlantIcon, User } from "@phosphor-icons/react";
import ModalAddPLant from "@/app/(private)/Components/ModalAddPlant";
import { auth, db } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Calendar } from "@phosphor-icons/react/dist/ssr";

const icon = L.icon({
  iconUrl: "/Marker.svg",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
});

interface OvinteDeCliquesProps {
  aoClicar: (lat: number, lng: number) => void;
}

interface Plantio {
  id: string | number;
  lat: number;
  lng: number;
  especie: string;
  desc?: string;
  quantidade: number | string;
  date: string;
  responsavel: string;
}

function OvinteDeCliques({ aoClicar }: OvinteDeCliquesProps) {
  useMapEvents({
    click(e) {
      aoClicar(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function Map() {
  const position: [number, number] = [-22.7494, -42.8592];
  const [modalAberto, setModalAberto] = useState(false);
  const [coordenadas, setCoordenadas] = useState({ lat: 0, lng: 0 });
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const { roleUser } = useAuth();
  const router = useRouter();
  const [plantios, setPlantios] = useState<Plantio[]>([]);

  function validadeUser() {
    if (roleUser === undefined) {
      console.log("Aguardando o roleUser carregar...");
      return;
    }

    if (roleUser === "admin") {
      return router.push("/dashboard/admin");
    }

    router.push("/dashboard/geral");
  }

  useEffect(() => {
    // 1. Criamos a referência da coleção ou query
    const q = collection(db, "plantios");

    // 2. Usamos o onSnapshot para escutar em tempo real
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const listaPlantios: Plantio[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as {
            quantidade?: number | string;
            id: string | number;
            lat?: number;
            lng?: number;
            especie?: string;
            desc?: string;
            date?: string;
            data?: string;
            responsavel?: string;
          };

          // Sua validação existente
          if (typeof data.lat !== "number" || typeof data.lng !== "number") {
            return;
          }

          listaPlantios.push({
            id: doc.id,
            quantidade: data.quantidade ?? "",
            lat: data.lat,
            lng: data.lng,
            especie: data.especie ?? "Espécie desconhecida",
            desc: data.desc ?? "",
            date: data.date ?? data.data ?? "", // Corrigido uma pequena duplicidade/fallback que estava no seu
            responsavel: data.responsavel ?? "",
          });
        });

        // 3. Atualiza o estado com os novos dados em tempo real
        setPlantios(listaPlantios);
      },
      (error) => {
        console.error("Erro ao buscar plantios em tempo real:", error);
      },
    );

    // 4. MUITO IMPORTANTE: Retornar a função de limpeza (unsubscribe)
    // Isso evita vazamento de memória quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  const handleCliqueNoMapa = async (lat: number, lng: number) => {
    setCoordenadas({ lat, lng });
    await delay(200)
    setModalAberto(true);
  };

  return (
    <>
      <div className="map-wrapper">
        <div className="box-infoMap">
          <button className="btnMapOpen" onClick={validadeUser}>
            <CaretLeftIcon size={29} color="#ffffff" />
          </button>
          <button className="btnAddPlant">
            <PlantIcon width={50} height={50} weight="fill" color="green" />
            <span>
              DICA: Toque em qualquer local do mapa para registrar um plantio
            </span>
          </button>
        </div>

        <MapContainer
          center={position}
          zoom={13}
          zoomControl={false}
          style={{ height: "100%", width: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {auth.currentUser ? (
            <OvinteDeCliques aoClicar={handleCliqueNoMapa} />
          ) : null}
          {plantios.map((plant) => (
            <Marker
              key={plant.id}
              position={[plant.lat, plant.lng]}
              icon={icon}
            >
              <Popup>
                <div className="boxInfo">
                  <div className="box-Especie">
                    <div className="title">
                      <span>{plant.especie}</span>
                    </div>
                    <p>{plant.desc}</p>
                  </div>
                  <div className="box-cards">
                    <div className="box-card">
                      <div className="quant">
                        <div className="info">
                          <Plant width={24} height={24} />
                          <span>Quantidade</span>
                        </div>
                        <span id="quantText">🌱 {plant.quantidade} Mudas</span>
                      </div>
                    </div>
                    <div className="box-card">
                      <div className="quant">
                        <div className="info">
                          <Calendar width={24} height={24} />
                          <span>Data do plantio</span>
                        </div>
                        <span id="quantText">{plant.date}</span>
                      </div>
                    </div>
                    <div className="box-card">
                      <div className="quant">
                        <div className="info">
                          <User width={24} height={24} />
                          <span>Responsável</span>
                        </div>
                        <span id="quantText">{plant.responsavel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="box-button">
                    <button id="editPlant">Editar plantio</button>
                    <button id="removePlant">Remover plantio</button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          {coordenadas && (
            <Circle
              center={coordenadas}
              pathOptions={{
                color: "#52ea70",
                fillColor: "#42c05b",
                fillOpacity: 0.3,
              }}
              radius={30}
            >
              
            </Circle>
          )}
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
