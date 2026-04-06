"use client";
import { CaretDownIcon, InfoIcon } from "@phosphor-icons/react";
import "../Assets/css/components/saibaMais.css";
import { useState, useRef } from "react";
export default function SaibaMais() {
  const [openAccordeon, setOpenAccordeon] = useState<number | null>(null);

  function openAccordeonInfo(id: number) {
    setOpenAccordeon((prevId) => (prevId === id ? null : id));
  }

  return (
    <>
      <div className="Container-saibaMais" id="Saiba">
        <div className="box-title">
          <h4>SAIBA MAIS</h4>
        </div>
        <div className="box-accordeon">
          <div className="accordeon" onClick={() => openAccordeonInfo(1)}>
            <div className="box-title">
              <InfoIcon size={29} color="#016726" />
              <span>Veja o guia de Plantio</span>
            </div>
            <CaretDownIcon
              style={{
                transform:
                  openAccordeon === 1 ? "rotate(180deg)" : "rotate(0deg)",
              }}
              size={29}
              color="#016726"
            />
          </div>
          <div className="accordeon" onClick={() => openAccordeonInfo(2)}>
            <div className="box-title">
              <InfoIcon size={29} color="#016726" />
              <span>Arborização Urbana</span>
            </div>
            <CaretDownIcon
              style={{
                transform:
                  openAccordeon === 2 ? "rotate(180deg)" : "rotate(0deg)",
              }}
              size={29}
              color="#016726"
            />
          </div>
          <div className="accordeon" onClick={() => openAccordeonInfo(3)}>
            <div className="box-title">
              <InfoIcon size={29} color="#016726" />
              <span>Legislação Municipal</span>
            </div>
            <CaretDownIcon
              style={{
                transform:
                  openAccordeon === 3 ? "rotate(180deg)" : "rotate(0deg)",
              }}
              size={29}
              color="#016726"
            />
          </div>
        </div>
      </div>
    </>
  );
}
