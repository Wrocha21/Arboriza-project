"use client";

import {
  ArrowRightIcon,
  GearIcon,
  HouseIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  function HandleRedirectPage(url : string){
    router.push(url)
  }

  return (
    <>
      <div className="container-Cards">
        <div className="Box-sections">
          <div className="card">
            <div className="box-info">
              <div className="box-icon">
                <HouseIcon size={50} weight="regular" color="#016726" />
              </div>
              <div className="box-titles">
                <p>Visão Geral</p>
                <span>Veja os números de membros, voluntários e projetos</span>
              </div>
            </div>
            <ArrowRightIcon size={32} color="#016726" id="GoTo" />
          </div>
          <div className="card">
            <div className="box-info">
              <div className="box-icon">
                <UsersThreeIcon size={50} weight="light" color="#016726" />
              </div>
              <div className="box-titles">
                <p>Equipe</p>
                <span>
                  Veja os integrantes da equipe e seus administradores
                </span>
              </div>
            </div>
            <ArrowRightIcon size={32} color="#016726" id="GoTo" />
          </div>
          <div className="card" id="Admin" onClick={() => HandleRedirectPage("dashboard/admin")}>
            <div className="box-info">
              <div className="box-icon">
                <GearIcon size={50} weight="light" color="#016726" />
              </div>
              <div className="box-titles">
                <p>Administração</p>
                <span>
                  Visualize e gerencie todos os logins criados e crie um plantio
                </span>

                <span id="Title">AREA ADMÍN</span>
              </div>
            </div>

            <ArrowRightIcon size={32} color="#016726" id="GoTo" />
          </div>
          <div className="card" onClick={() => HandleRedirectPage("/")}>
            <div className="box-info">
              <div className="box-icon">
                <UsersThreeIcon size={50} weight="light" color="#016726" />
              </div>
              <div className="box-titles">
                <p>Sair do Painel</p>
                <span>
                  Volte para a página incial
                </span>
              </div>
            </div>
            <ArrowRightIcon size={32} color="#ff0b0b" id="GoTo" />
          </div>
        </div>
      </div>
    </>
  );
}
