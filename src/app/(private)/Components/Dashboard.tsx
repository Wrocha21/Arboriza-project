"use client";

import Card from "@/Components/Card";
import { useAuth, AuthProvider } from "@/app/context/AuthContext";
import {
  SignOutIcon,
  GearIcon,
  HouseIcon,
  UsersThreeIcon,
  ArrowUDownLeftIcon,
} from "@phosphor-icons/react";

import { useRouter } from "next/navigation";
import DashboardWelcome from "@/Components/DashboardTitle";
import NavbarDashboard from "./NavbarDashboard";
import { useEffect } from "react";
import { deleteOldLogs } from "./DeleteLogs";

export function DashboardContent() {
  const router = useRouter();
  const { userName, roleUser } = useAuth();
  useEffect(() => {
    const HOJE = new Date().toDateString(); // Ex: "Sun Jun 28 2026"
    const ultimaLimpeza = localStorage.getItem("DATA_ULTIMA_LIMPEZA");

    // Só roda a função se a última limpeza não tiver sido feita hoje
    if (ultimaLimpeza !== HOJE) {
      deleteOldLogs().then(() => {
        // Salva no navegador que a limpeza do dia já foi concluída
        localStorage.setItem("DATA_ULTIMA_LIMPEZA", HOJE);
      });
    }
  }, []);

  return (
    <>
      <NavbarDashboard />
      <div className="container-dashboard">
        <DashboardWelcome
          title="Gestão do sistema"
          arrowBack={ArrowUDownLeftIcon}
          username={userName}
          hasAction={() => router.push("/")}
          desc="Gerencie as ações, equipes e o impacto do projeto na cidade."
        />

        <div className="container-Cards">
          <div className="Box-sections">
            <Card
              title="Visão Geral"
              icon={HouseIcon}
              colorArrow="rgb(10, 137, 29)"
              bgIcon="rgba(10, 137, 29, 0.58)"
              colorIcon="white"
              desc="Veja os números de membros, projeto e voluntários"
              hasNumber={false}
              hasAction={() => router.push("/dashboard/geral")}
            />
            <Card
              title="Equipe"
              icon={UsersThreeIcon}
              colorArrow="rgb(10, 57, 137)"
              bgIcon="rgba(10, 57, 137, 0.58)"
              desc="Veja os membros da equipe"
              colorIcon="white"
              hasNumber={false}
              hasAction={() => router.push("/dashboard/equipe")}
            />
            {roleUser === "admin" && (
              <Card
                title="Administração"
                icon={GearIcon}
                colorIcon="white"
                colorArrow="rgb(228, 137, 25)"
                bgIcon="rgba(228, 137, 25, 0.58)"
                desc="Gerencie as contas criadas e adicione um plantio"
                hasNumber={false}
                hasAction={() => {
                  router.push("/dashboard/admin");
                }}
              />
            )}
            <Card
              title="Sair do Painel"
              icon={SignOutIcon}
              colorIcon="white"
              colorArrow="rgb(228, 25, 25)"
              bgIcon="rgba(228, 25, 25, 0.58)"
              desc="Volte para a página principal"
              hasNumber={false}
              hasAction={() => {
                router.push("/");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
