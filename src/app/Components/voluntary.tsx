"use client";

import Link from "next/link";
import "../Assets/css/components/voluntary.css";
import { HandshakeIcon } from "@phosphor-icons/react";

export default function Voluntary() {
  return (
    <>
      <div className="Container-plantio">
        <div className="box-plantio">
          <div className="box-title">
            <h4>QUER UMA ÁRVORE EM SUA CALÇADA?</h4>
            <span>Preencha o formulário e entraremos em contato.</span>
          </div>
          <Link href={""}>
            <button>ACESSAR FORMULÁRIO</button>
          </Link>
        </div>
      </div>
      <div className="Container-voluntary" id="voluntary">
        <div className="box-title">
          <h4>SEJA UM VOLUNTÁRIO</h4>
          <span>Ajude a transformar vidas e faça parte da nossa história.</span>
        </div>
        <Link href={""}>
          <button>
            <HandshakeIcon size={29} color="#ffffff" />
            QUERO SER VOLUNTÁRIO
          </button>
        </Link>
      </div>
    </>
  );
}
