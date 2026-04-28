"use client";

import Card from "@/Components/Card";
import {
  ArrowRightIcon,
  GearIcon,
  HouseIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  function HandleRedirectPage(url: string) {
    router.push(url);
  }

  return (
    <>
      <div className="container-Cards">
        <div className="Box-sections">
          <Card
            icon={HouseIcon}
            title="Visão Geral"
            desc="Veja os números de membros, voluntários e projetos"
            hasNumber
            numText=""
          />
          <Card
            icon={UsersThreeIcon}
            title="Equipe"
            desc="Veja os integrantes da equipe e seus administradores"
            hasNumber
            numText=""
          />
          <Card
            icon={GearIcon}
            title="Administração"
            desc="Visualize e gerencie todos os logins criados e crie um plantio"
            hasNumber
            numText=""
            hasRedirect={() => HandleRedirectPage("dashboard/admin")}
          
          />
          <Card
            icon={UsersThreeIcon}
            title="Sair do Painel"
            desc="Volte para a página incial"
            hasNumber
            numText=""
            onLeftPage={() => HandleRedirectPage("/")}
          
          />
        </div>
      </div>
    </>
  );
}
