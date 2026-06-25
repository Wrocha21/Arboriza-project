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
import {
  CaretLeftIcon,
  CheckIcon,
  CircleNotchIcon,
  PlantIcon,
  Tree,
  UserCircle,
  XIcon,
  CalendarBlank,
} from "@phosphor-icons/react";
import ModalAddPLant from "@/app/(private)/Components/ModalAddPlant";
import { auth, db } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Plantio } from "@/types/plantio";

import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

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
      aoClicar(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function Map() {
  const position: [number, number] = [-22.7494, -42.8592];
  const [modalAberto, setModalAberto] = useState(false);
  const [coordenadas, setCoordenadas] = useState({ lat: 0, lng: 0 });
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [plantioSelecionado, setPlantioSelecionado] = useState<Plantio | null>(
    null,
  );
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failed"
  >("idle");
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
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
    const q = collection(db, "plantios");

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
            date: data.date ?? data.data ?? "",
            responsavel: data.responsavel ?? "",
          });
        });

        setPlantios(listaPlantios);
      },
      (error) => {
        console.error("Erro ao buscar plantios em tempo real:", error);
      },
    );
    return () => unsubscribe();
  }, []);

  async function deletePlantMarker(plantId: string | number) {
    try {
      setStatus("loading");
      await delay(500);
      const ref = doc(db, "plantios", String(plantId));
      setStatus("success");
      await delay(2000);
      await deleteDoc(ref);
    } catch (error) {
      console.error(error);
      await delay(500);
      setStatus("failed");
    } finally {
      setStatus("idle");
    }
  }

  const handleCliqueNoMapa = async (lat: number, lng: number) => {
    setCoordenadas({ lat, lng });
    await delay(200);
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
                          <Tree width={24} height={24} />
                          <span>Quantidade</span>
                        </div>
                        <span id="quantText">🌱 {plant.quantidade} Mudas</span>
                      </div>
                    </div>
                    <div className="box-card">
                      <div className="quant">
                        <div className="info">
                          <CalendarBlank width={24} height={24} />
                          <span>Data do plantio</span>
                        </div>
                        <span id="quantText">{plant.date}</span>
                      </div>
                    </div>
                    <div className="box-card">
                      <div className="quant">
                        <div className="info">
                          <UserCircle width={24} height={24} />
                          <span>Responsável</span>
                        </div>
                        <span id="quantText">{plant.responsavel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="box-button">
                    <button
                      id="editPlant"
                      onClick={() => {
                        setModalEditarAberto(true);
                        setPlantioSelecionado(plant)
                      }}
                    >
                      Editar plantio
                    </button>
                    <button
                      type="submit"
                      id="removePlant"
                      onClick={() => deletePlantMarker(plant.id)}
                      style={{
                        backgroundColor:
                          status === "failed" ? "rgb(255, 70, 70)" : "",
                      }}
                    >
                      {status != "idle" ? "" : "Deletar Plantio"}
                      {status == "loading" ? (
                        <div className="box-loadingCircleAndSucess">
                          <CircleNotchIcon
                            id="circleIcon"
                            size={32}
                            color="#ffffff"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {status == "success" ? (
                        <div className="box-loadingCircleAndSucess">
                          <CheckIcon
                            id="checkIcon"
                            size={32}
                            color="#ffffff"
                            weight="regular"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {status == "failed" ? (
                        <div className="box-loadingCircleAndSucess">
                          <XIcon
                            id="checkIcon"
                            size={32}
                            color="#ffffff"
                            weight="regular"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </button>
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
            ></Circle>
          )}
        </MapContainer>
      </div>

      {modalAberto && (
        <ModalAddPLant
          modo="create"
          setOpenMenu={setModalAberto}
          latitude={coordenadas.lat}
          longitude={coordenadas.lng}
        />
      )}

      {modalEditarAberto && (
        <ModalAddPLant
          modo="edit"
          setOpenMenu={setModalEditarAberto}
          latitude={coordenadas.lat}
          longitude={coordenadas.lng}
          plantio={plantioSelecionado}
        />
      )}
    </>
  );
}
