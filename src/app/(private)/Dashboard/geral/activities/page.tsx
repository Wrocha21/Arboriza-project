"use client";
import NavbarDashboard from "@/app/(private)/Components/NavbarDashboard";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { PlantLogItem } from "@/Components/CardLogs";
import {
  AppWindowIcon,
  ArrowUDownLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import Image from "next/image";

import noHistoric from "../../../../../../public/noHistorico.png";
import "@/Assets/css/components/activityDash.css";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/Components/DashboardTitle";
import { PlantLogsProps } from "@/types/logs";
export function Activities() {
  const router = useRouter();
  const { logs, userName } = useAuth();
  const plantioLogs = logs?.filter((p) => p.tipo === "plantio") ?? [];
  return (
    <>
      <NavbarDashboard />
      <div className="container-activities">
        <DashboardTitle
          title="Logs de plantios"
          arrowBack={ArrowUDownLeftIcon}
          username={userName}
          hasAction={() => router.push("/dashboard/geral")}
          desc="Visualize todas as mudanças no sistema"
        />

        <div className="box-atividades">
          <div className="box-logs">
            {([...plantioLogs] as PlantLogsProps[])
              .sort((a, b) => {
                const segundosB = b.timestamp?.seconds || 0;
                const segundosA = a.timestamp?.seconds || 0;
                return segundosB - segundosA;
              })
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
              <Image src={noHistoric} width={300} height={200} alt=""></Image>
              <div className="info">
                <span id="title">Não há atividades no histórico</span>
                <span id="subtitle">
                  Assim que houver atividades, elas aparecerão aqui.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function ActivitiesPage() {
  return (
    <AuthProvider>
      <Activities />
    </AuthProvider>
  );
}
