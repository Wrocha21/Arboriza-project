"use client";
import {
  ArrowRightIcon,
  ArrowUDownLeftIcon,
  GearIcon,
  PlantIcon,
  UserGearIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import "@/Assets/css/components/adminSections.css";
import { useState } from "react";
import ModalCreateUser from "../../Components/ModalCreateUser";

export default function Admin() {
  const [openModalCreateAccount, setOpenModalCreateAccount] = useState(false);

  return (
    <>
      <div className="box-adm">
        <div className="box-info">
          <div className="box-title">
            <GearIcon size={40} weight="regular" color="#016726" />
            <span>ADMINISTRAÇÃO</span>
          </div>
          <ArrowUDownLeftIcon id="ArrowBack" size={27} />
        </div>
        <span id="descTitle">
          Gerencie usuários, permissões e configurações do sistema
        </span>
        <div className="box-options">
          <button onClick={() => setOpenModalCreateAccount(true)}>
            <UserPlusIcon size={32} />
            Criar conta
          </button>
          <div className="box-accordeon">
            <div className="accordeon">
              <div className="box-icon">
                <UserGearIcon size={29} />
              </div>
              <div className="box-title">
                <span>Gerenciar Usuários</span>
                <span>Visualize e edite as contas dos integrantes</span>
              </div>
              <div className="box-arrow">
                <ArrowRightIcon size={32} color="#016726" />
              </div>
            </div>
            <div className="accordeon">
              <div className="box-icon">
                <PlantIcon size={29} />
              </div>
              <div className="box-title">
                <span>Gerenciar Plantios</span>
                <span>Crie markers no mapa, edite informações e exclua</span>
              </div>
              <div className="box-arrow">
                <ArrowRightIcon size={32} color="#016726" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModalCreateAccount && <ModalCreateUser setOpenMenu={setOpenModalCreateAccount}/>}
    </>
  );
}
