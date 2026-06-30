"use client";

import NavbarDashboard from "@/app/(private)/Components/NavbarDashboard";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { PlantLogItem } from "@/Components/CardLogs";
import { ArrowUDownLeftIcon } from "@phosphor-icons/react";
import Image from "next/image";
import noHistoric from "../../../../../../public/noHistorico.png";

import "@/Assets/css/components/logsActivity.css";
import DashboardTitle from "@/Components/DashboardTitle";
import { useRouter } from "next/navigation";
import { UserLogsProps } from "@/types/logs";
export function LogsContent() {
  const { logs, userName } = useAuth();
  const router = useRouter();
  const usuarioLogs = logs?.filter((p) => p.tipo === "usuario") ?? [];
  return (
    <>
      <NavbarDashboard />
      <div className="container-logs">
        <DashboardTitle
          title="Logs do Sistema"
          arrowBack={ArrowUDownLeftIcon}
          username={userName}
          hasAction={() => router.push("/dashboard/admin")}
          desc="Visualize todas as mudanças no sistema"
        />
        <div className="box-logs">
          {([...usuarioLogs] as UserLogsProps[])
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
          {usuarioLogs.length === 0 && (
            <div className="box-noHistoric">
              <Image
                src={noHistoric}
                width={300}
                height={200}
                loading="eager"
                alt=""
              ></Image>
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

export default function Logs() {
  return (
    <AuthProvider>
      <LogsContent />
    </AuthProvider>
  );
}
