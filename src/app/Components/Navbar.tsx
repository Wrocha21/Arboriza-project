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

import { useState, useRef } from "react";
import Image from "next/image";
import "../Assets/css/components/navbar.css";
import logoArboriza from "../Assets/css/images/LOGO.png";
import Link from "next/link";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  function openMenuHamburguer() {
    setOpenMenu(openMenu === false ? true : false);
    console.log(openMenu);
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
          <div className="box-HideMenu" >
            <div className="box-options">
              <ul>
                <Link href={""}>
                  <li>
                    <HouseIcon size={29} color="#383333" />
                    Início
                  </li>
                </Link>
                <Link href={""}>
                  <li>
                    <MapTrifoldIcon size={29} color="#383333" />
                    Mapa
                  </li>
                </Link>
                <Link href={""}>
                  <li>
                    <UsersThreeIcon size={29} color="#383333" />
                    Sobre nós
                  </li>
                </Link>
                <Link href={""}>
                  <li>
                    <HandshakeIcon size={29} color="#383333" />
                    Seja voluntário
                  </li>
                </Link>
                <Link href={""}>
                  <li>
                    <QuestionMarkIcon size={29} color="#383333" />
                    Saiba mais
                  </li>
                </Link>
              </ul>
            </div>
            <div className="box-login">
              <ul></ul>
              <div className="login">
                <button>
                  <SignInIcon size={29} color="#ffffff" />
                  Acessar o sistema
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
