"use client";

import {
  HouseIcon,
  ListIcon,
  MapTrifoldIcon,
  UsersThreeIcon,
  HandshakeIcon,
  QuestionMarkIcon,
  SignInIcon,
} from "@phosphor-icons/react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../../Assets/css/components/navbar.css";
import logoArboriza from "@/Assets/css/images/LOGO.png";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  
  function openMenuHamburguer() {
    setOpenMenu(!openMenu);
  }
  function HandleOnClickLink(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  function OnClickButtonLogin() {
    router.push("/login");
  }

  return (
    <>
      <div className="container-navbar">
        <div className="navbar">
          <div className="logo">
            <Image
              src={logoArboriza}
              width={240}
              height={80}
              alt="LogoArboriza"
              loading="eager"
            ></Image>
          </div>
          <div className="menuHamburguer">
            <ListIcon size={32} color="#383333" onClick={openMenuHamburguer} />
          </div>
        </div>

        <div className={`box-HideMenu ${openMenu ? "active" : ""}`}>
          <div className="box-options">
            <ul>
              <li onClick={() => HandleOnClickLink("hero")}>
                <HouseIcon size={29} color="#383333" />
                <span>Início</span>
              </li>
              <li onClick={() => HandleOnClickLink("map")}>
                <MapTrifoldIcon size={29} color="#383333" />
                <span>Mapa</span>
              </li>
              <li onClick={() => HandleOnClickLink("sobre")}>
                <UsersThreeIcon size={29} color="#383333" />
                <span>Sobre nós</span>
              </li>
              <li onClick={() => HandleOnClickLink("voluntary")}>
                <HandshakeIcon size={29} color="#383333" />
                <span>Seja voluntário</span>
              </li>
              <li onClick={() => HandleOnClickLink("saiba")}>
                <QuestionMarkIcon size={29} color="#383333" />
                <span>Saiba mais</span>
              </li>
            </ul>
          </div>
          <div className="box-login">
            <ul></ul>
            <div className="login" onClick={OnClickButtonLogin}>
              <button>
                <SignInIcon size={29} color="#ffffff" />
                Acessar o sistema
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
