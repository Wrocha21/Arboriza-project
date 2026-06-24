"use client";

import Logo from "@/Assets/css/images/LOGO.png";
import Image from "next/image";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { ModalPerfilContent } from "./modalPefil";

import defaultProfile from "@/Assets/css/images/avatarPadrao.png"

export default function NavbarContent() {
  const { setOpenModalPerfil, photoURL, openModalPerfil } = useAuth();

  return (
    <>
    
      <div className="container-navDash">
        <div className="logo">
          <Image src={Logo}  height={80} alt="Logo" loading="eager" />
        </div>
        <div className="box-perfil" onClick={() => setOpenModalPerfil(true)}>
          <div className="circle">
            <Image src={photoURL&& photoURL.trim() !== "" ? photoURL : defaultProfile} width={53} height={53} alt=""/>
          </div>
        </div>
      </div>

      
      {openModalPerfil && <ModalPerfilContent />}
    </>
  );
}

