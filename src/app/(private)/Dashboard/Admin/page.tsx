"use client";
import {
  ArrowUDownLeftIcon,
  Tree,
  User,
  UserPlusIcon,
  UserGearIcon,
  MapPinArea,
  AppWindowIcon,
  MapTrifoldIcon,
} from "@phosphor-icons/react";
import "@/Assets/css/components/adminSections.css";
import "@/Assets/css/global.css";

import { useState } from "react";
import ModalCreateUser from "../../Components/ModalCreateUser";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/Components/DashboardTitle";
import Card from "@/Components/Card";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import NavbarDashboard from "../../Components/NavbarDashboard";

export function AdminContent() {
  const [openModalCreateAccount, setOpenModalCreateAccount] = useState(false);
  const router = useRouter();
  const { userName, usuarios, plants } = useAuth();
  return (
    <>
      <NavbarDashboard />
      <div className={"box-adm"}>
        <DashboardTitle
          title="Painel Admin"
          arrowBack={ArrowUDownLeftIcon}
          username={userName}
          hasAction={() => router.push("/dashboard")}
          desc="Gerencie os usuários cadastrados e crie um plantio"
        />
        <div className="box-geral">
          <div className="box-titleSec">
            <span className="title">Visão geral</span>
          </div>
          <div className="box-cards">
            <div className="groupCard">
              <div className="card">
                <div className="box-icon">
                  <User />
                </div>
                <div className="box-title">
                  <h2>{usuarios.length}</h2>
                  <span>Usuários cadastrados</span>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="box-icon">
                <Tree />
              </div>
              <div className="box-title">
                <h2>{plants.length}</h2>
                <span>Plantios cadastrados</span>
              </div>
            </div>
          </div>
        </div>
        <div className="box-actions">
          <span>Ações rápidas</span>
          <div className="box-cards">
            <Card
              title="Criar usuário"
              icon={UserPlusIcon}
              colorArrow="rgb(10, 137, 29)"
              bgIcon="#E0F0E6"
              colorIcon="#2A874B"
              desc="Adicione um novo usuário no sistema"
              hasNumber={false}
              hasAction={() => setOpenModalCreateAccount(true)}
            />
            <Card
              title="Gerenciar usuários"
              icon={UserGearIcon}
              colorArrow="rgb(10, 137, 29)"
              bgIcon="#1B713B"
              colorIcon="white"
              desc="Controle permissões, edite dados e remova acessos"
              hasNumber={false}
              hasAction={() => router.push("/dashboard/equipe")}
            />
            <Card
              title="Acessar o Mapa"
              icon={MapTrifoldIcon}
              colorArrow="rgb(10, 137, 29)"
              bgIcon="#004C1D"
              colorIcon="white"
              desc="Adicione ou edite um novo plantio no mapa"
              hasNumber={false}
              hasAction={() => router.push("/dashboard/admin/plantios")}
            />
          </div>
        </div>
        <div className="box-ferramenta">
          <span>Ferramentas administrativas</span>
          <div className="box-card">
            <Card
              title="Histórico do sistema"
              icon={AppWindowIcon}
              colorArrow="rgb(10, 137, 29)"
              bgIcon="#E0F0E6"
              colorIcon="#2A874B"
              desc="Acompanhe o histórico de atividades dos usuários"
              hasNumber={false}
              hasAction={() => router.push("/dashboard/admin/logs")}
            />
          </div>
        </div>
      </div>
      {openModalCreateAccount && (
        <ModalCreateUser setOpenMenu={setOpenModalCreateAccount} />
      )}
    </>
  );
}

export default function Admin() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}
