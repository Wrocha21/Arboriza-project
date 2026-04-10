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
          <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSdH-jn9ditaoj50QSBW5N-dJc6SlMMzgGX_U6lcSsumY0fcPg/viewform"}>
            <button>ACESSAR FORMULÁRIO</button>
          </Link>
        </div>
      </div>
      <div className="Container-voluntary" id="voluntary">
        <div className="box-title">
          <h4>SEJA UM VOLUNTÁRIO</h4>
          <span>Ajude a transformar vidas e faça parte da nossa história.</span>
        </div>
        <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSfExU_LVApEQUBJccT-PDab3DOklojIkwbw9-05iBYU8zlJOg/viewform"}>
          <button>
            <HandshakeIcon size={29} color="#ffffff" />
            QUERO SER VOLUNTÁRIO
          </button>
        </Link>
      </div>
    </>
  );
}
