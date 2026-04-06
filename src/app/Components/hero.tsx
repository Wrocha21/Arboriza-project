"use client";

import Image from "next/image";
import heroImg from "../Assets/css/images/pexels-melquizedeque-30619295.jpg";
import "../Assets/css/components/hero.css";
import { CaretDownIcon } from "@phosphor-icons/react";
import plantIcon from "../Assets/css/images/plant.svg";
import projectIcon from "../Assets/css/images/projector-screen-chart.svg";

import Link from "next/link";
import usersIcon from "../Assets/css/images/users-three.svg";
import CardR from "./CardR";

export default function Hero() {
  function HandleOnClickLink(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <div className="container-hero" id="hero">
        <Image
          src={heroImg}
          width={1000}
          height={1000}
          alt="ImagemHero"
          loading="eager"
        />
        <div className="texts">
          <p>
            MAIS <span>ÁRVORES</span>, MAIS <span>VIDA</span>, MAIS FUTURO PARA{" "}
            <span>ITABORAÍ</span>
          </p>
          <p>
            Plantar árvores não é apenas um gesto simbólico — é uma ação
            concreta que gera impacto real para as gerações presentes e futuras.
          </p>
        </div>
        <div className="box-buttons">
          <Link href={""} onClick={() => HandleOnClickLink('sobre')}>
            <button>
              Saiba mais
              <CaretDownIcon size={22} color="#ffffff" />
            </button>
          </Link>
        </div>
      </div>
      <div className="container-cards">
        <div className="box-titleSection">
          <span>Nosso Impacto em Números</span>
          <span className="subText">
            Pequenas ações que cultivam grandes mudanças.
          </span>
        </div>
        <div className="box-cards">
          <CardR
            icon={plantIcon}
            title="Mudas plantadas"
            desc="Temos orgulho de compartilhar que ultrapassamos a marca de 100 mudas plantadas!"
            numText="+100"
          />
          <CardR
            icon={projectIcon}
            title="Projetos realizados"
            desc="Experiência que transforma. São mais de 21 soluções entregues com foco em inovação e resultados reais."
            numText="21"
          />
          <CardR
            icon={usersIcon}
            title="Ações comunitárias"
            desc="Transformamos realidades através de diversas ações sociais, fortalecendo os laços e o apoio à nossa comunidade local."
            numText="12"
          />
        </div>
      </div>
    </>
  );
}
