"use client";

import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import DashboardTitle from "@/Components/DashboardTitle";
import {
  ArrowUDownLeftIcon,
  Plant,
  UsersThreeIcon,
  MapTrifoldIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import "@/Assets/css/global.css";
import "@/Assets/css/components/geralDash.css";

import noHistoric from "../../../../../public/noHistorico.png";
import Image from "next/image";
import NavbarDashboard from "../../Components/NavbarDashboard";
import { PlantLogItem } from "@/Components/CardLogs";

export function GeralContent() {
  const { userName, usuarios, logs, plants } = useAuth();
  const router = useRouter();
  return (
    <>
      <NavbarDashboard />
      <div className="container-geral">
        <DashboardTitle
          title="Visão geral"
          arrowBack={ArrowUDownLeftIcon}
          username={userName}
          hasAction={() => router.push("/dashboard/")}
          desc="Dados atualizados e panorama geral do Arboriza Itaboraí!"
        />

        <div className="box-indicadores">
          <span>Visão geral</span>
          <div className="box-cards">
            <div className="card">
              <div className="box-icon">
                <UsersThreeIcon />
              </div>
              <div className="box-title">
                <h2 id="cardText">{usuarios.length}</h2>
                <span>Membros na Equipe</span>
              </div>
            </div>
            <div className="card">
              <div className="box-icon" id="boxPlantCard">
                <Plant />
              </div>
              <div className="box-title">
                <h2 id="cardText">{plants.length}</h2>
                <span>Plantios registrados</span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-actions">
          <span>Ações rápidas</span>
          <div className="box-circles">
            <div
              className="circle"
              onClick={() => router.push("/dashboard/admin/plantios")}
            >
              <div className="infoBox">
                <MapTrifoldIcon width={24} height={24} />
              </div>
              <span>Abrir mapa</span>
            </div>
            <div className="circle">
              <div className="infoBox">
                <Plant width={24} height={24} />
              </div>
              <span>Novo plantio</span>
            </div>
            <div className="circle">
              <div className="infoBox">
                <UsersThreeIcon width={24} height={24} />
              </div>
              <span>Equipe ativos</span>
            </div>
          </div>
        </div>
        <div className="box-atividades">
          <div
            className="box-info"
            onClick={() => router.push("/dashboard/geral/activities")}
          >
            <span>Atividades recentes</span>
            <div className="box-see">
              <span>Ver todas</span>
              <CaretRightIcon width={24} height={24} />
            </div>
          </div>

          <div className="box-logs">
            {logs
              .filter((p) => p.tipo === "plantio")
              .slice(0, 2)
              .map((p) => {
                return (
                  <div className="box-log" key={p.id}>
                    <PlantLogItem log={p} />
                  </div>
                );
              })}
          </div>
          {!logs && (
            <div className="box-noHistoric">
              <Image src={noHistoric} width={100} height={100} alt=""></Image>
              <span>Não há atividades no histórico</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Geral() {
  return (
    <AuthProvider>
      <GeralContent />
    </AuthProvider>
  );
}
