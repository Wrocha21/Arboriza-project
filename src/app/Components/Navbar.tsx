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
import "../Assets/css/components/navbar.css";
import logoArboriza from "../Assets/css/images/LOGO.png";
import Link from "next/link";

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

  function OnClickButtonLogin(){
    router.push("/sign-In")
  }

  return (
    <>
      <div className="container-navbar">
        <div className="navbar">
          <div className="logo">
            <Image
              src={logoArboriza}
              width={124}
              height={57}
              alt="LogoArboriza"
            ></Image>
          </div>
          <div className="menuHamburguer">
            <ListIcon size={32} color="#383333" onClick={openMenuHamburguer} />
          </div>
        </div>
        {openMenu && (
          <div className="box-HideMenu">
            <div className="box-options">
              <ul>
                <Link href={""} onClick={() => HandleOnClickLink("hero")}>
                  <li>
                    <HouseIcon size={29} color="#383333" />
                    Início
                  </li>
                </Link>
                <Link href={""} onClick={() => HandleOnClickLink("map")}>
                  <li>
                    <MapTrifoldIcon size={29} color="#383333" />
                    Mapa
                  </li>
                </Link>
                <Link href={""} onClick={() => HandleOnClickLink("sobre")}>
                  <li>
                    <UsersThreeIcon size={29} color="#383333" />
                    Sobre nós
                  </li>
                </Link>
                <Link href={""} onClick={() => HandleOnClickLink("voluntary")}>
                  <li>
                    <HandshakeIcon size={29} color="#383333" />
                    Seja voluntário
                  </li>
                </Link>
                <Link href={""} onClick={() => HandleOnClickLink("saiba")}>
                  <li>
                    <QuestionMarkIcon size={29} color="#383333" />
                    Saiba mais
                  </li>
                </Link>
              </ul>
            </div>
            <div className="box-login">
              <ul></ul>
              <div className="login" onClick={OnClickButtonLogin}>
                <Link href={""} >
                  <button >
                    <SignInIcon size={29} color="#ffffff" />
                    Acessar o sistema
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
