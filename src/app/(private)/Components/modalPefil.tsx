"use client";

import "@/Assets/css/global.css";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import "@/Assets/css/components/modalPerfil.css";
import Image from "next/image";

import defaultProfile from "@/Assets/css/images/avatarPadrao.png"

import Logo from "@/Assets/css/images/LOGO.png";
import { CaretLeftIcon } from "@phosphor-icons/react";
import UploadFoto from "@/Components/UploadFoto";

export function ModalPerfilContent() {
  const {
    userId,
    userName,
    photoURL,
    roleUser,
    setOpenModalPerfil,
    emailUser,
  } = useAuth();

  const name = userName[0] + userName.slice(1)
  
  return (
    <>
      <div className="container-perfil">
        <div className="box-info">
          <div className="buttonBack" onClick={() => setOpenModalPerfil(false)}>
            <CaretLeftIcon width={30} height={30} alt="" weight="regular" />
          </div>
          <div className="logo">
            <Image src={Logo} width={124} height={57} alt=""></Image>
          </div>
        </div>
        <div className="box-perfil">
          <div className="perfil">
            <div className="circle">
              <Image src={photoURL&& photoURL.trim() !== "" ? photoURL : defaultProfile} width={125} height={125} alt=""></Image>
              <div className="box-upload">
                {userId && <UploadFoto userId={userId} />}
              </div>
            </div>
            <div className="texts">
              <span id="name">
                {name}
              </span>
              <span id="role">
                {roleUser === "admin" ? "Administrador" : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="container-inputs">
          <div className="box-inputs">
            <div className="box-info1">
              <div className="box-nome">
                <span id="titleInput">Seu nome</span>
                <div className="input">
                  <input
                    type="text"
                    name="nome"
                    disabled
                    value={name}
                    id="nome"
                  />
                </div>
              </div>
              <div className="box-cargo">
                <span id="titleInput">Cargo</span>
                <div className="input">
                  <input
                    type="text"
                    name="cargo"
                    disabled
                    value={roleUser}
                    id="cargo"
                  />
                </div>
              </div>
            </div>
            <div className="box-email">
              <span id="titleInput">Email</span>
              <div className="input">
                <input
                  type="text"
                  name="email"
                  value={emailUser}
                  disabled
                  id="email"
                />
              </div>
            </div>
            <span id="recovery">Alterar senha</span>
          </div>
        </div>
        <div className="buttons">
          <button id="save">Salvar alterações</button>
          <button id="logout">Terminar sessão</button>
        </div>
      </div>
    </>
  );
}

export default function ModalPerfil() {
  return (
    <AuthProvider>
      <ModalPerfilContent />
    </AuthProvider>
  );
}
