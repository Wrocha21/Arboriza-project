"use client";
import {
  ArrowLeftIcon,
  CaretRightIcon,
  GearIcon,
  PlantIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import "@/Assets/css/components/adminSections.css";
import { useState } from "react";
import ModalCreateUser from "../../Components/ModalCreateUser";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [openModalCreateAccount, setOpenModalCreateAccount] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="box-adm">
        <div className="box-info">
          <div className="box-title">
            <GearIcon size={40} weight="regular" color="#016726" />
            <span>ADMINISTRAÇÃO</span>
          </div>
          <ArrowLeftIcon id="ArrowBack" size={27} onClick={() => router.push('/dashboard')} />
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
                <PlantIcon size={29} />
              </div>
              <div className="box-title">
                <span>Gerenciar Plantios</span>
                <span>Crie marcadores no mapa, edite informações ou remova registros.</span>
              </div>
              <div className="box-arrow">
                <CaretRightIcon size={32} color="#016726" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModalCreateAccount && <ModalCreateUser setOpenMenu={setOpenModalCreateAccount}/>}
    </>
  );
}
