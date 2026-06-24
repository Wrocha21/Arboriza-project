"use client";

interface ModalUserProps {
  setOpenMenu: (value: boolean) => void;
  latitude: number;
  longitude: number;
}
import "@/Assets/css/components/modalCreateUser.css";
import { CheckIcon, CircleNotchIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import logoTree from "@/Assets/css/images/Tree.png";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/auth/auth";
import { useAuth } from "@/app/context/AuthContext";

export default function ModalAddPLant({
  setOpenMenu,
  latitude,
  longitude,
}: ModalUserProps) {
  const [inputValueLatitude, setInputValueLatitude] = useState<number | string>(latitude,);
  const [inputValueLongitude, setInputValueLongitude] = useState<number | string>(longitude);
  const [inputValueEspecie, setInputValueEspecie] = useState<string>("");
  const [inputValueDesc, setInputValueDesc] = useState<string>("");
  const [inputValueQuant, setInputValueQuant] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failed"
  >("idle");
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const {userName} = useAuth();

  async function addPlantDb(e: React.FormEvent) {
    e.preventDefault();
    try {
      setStatus("loading");
      await delay(500);
      if (!inputValueEspecie) {
        setStatus("failed");
        await delay(2000);
        setStatus("idle");
        return;
      }
      const especieFormatada = inputValueEspecie
        .replace(/\s*[---]\s*/g, "-") // Remove espaços antes e depois do hífen
        .trim();
      await addDoc(collection(db, "plantios"), {
        lat: latitude,
        lng: longitude,
        especie: especieFormatada,
        desc: inputValueDesc,
        quantidade: inputValueQuant,
        responsavel: userName,
        data: new Date().toLocaleDateString("pt-BR")
      });

      setStatus("success");
      await delay(2000);
    } catch (error) {
      console.log("erro ao adicionar um plantio", error);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <>
      <div className="containerModal" id="AddPlantContainer">
        <div className="boxModal">
          <div className="modal">
            <div className="box-info">
              <Image src={logoTree} width={57} height={57} alt=""></Image>
              <span>CRIAR PLANTIO</span>
              <XIcon
                size={32}
                color="#000000"
                onClick={() => setOpenMenu(false)}
              />
            </div>
            <div className="container-inputs">
              <form onSubmit={addPlantDb}>
                <div className="box-inputEmail">
                  <span>Latitude</span>
                  <div
                    className="input"
                    style={{
                      border: inputValueLatitude ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
                      value={latitude.toFixed(6)}
                      disabled
                      onChange={(e) => setInputValueLatitude(e.target.value)}
                      placeholder="Nome do usuário"
                    />
                  </div>
                </div>
                <div className="box-inputEmail">
                  <span>Longitude</span>
                  <div
                    className="input"
                    style={{
                      border: inputValueLongitude ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
                      value={longitude.toFixed(6)}
                      disabled
                      onChange={(e) => setInputValueLongitude(e.target.value)}
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div className="box-inputEmail">
                  <span>Espécie</span>
                  <div
                    className="input"
                    style={{
                      border: inputValueEspecie ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
                      onChange={(e) => setInputValueEspecie(e.target.value)}
                      placeholder="Ex: ipê-amarelo"
                    />
                  </div>
                </div>
                <div className="box-inputEmail">
                  <span>Quantidade</span>
                  <div
                    className="input"
                    style={{
                      border: inputValueQuant ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="number"
                      value={inputValueQuant}
                      onChange={(e) => setInputValueQuant(e.target.value)}
                      placeholder="Quantidade"
                    />
                  </div>
                </div>
                <div className="box-inputEmail" id="InputDesc">
                  <span>Descrição</span>
                  <div
                    className="input"
                    style={{
                      border: inputValueDesc ? "1px solid black" : "",
                    }}
                  >
                    <textarea
                      onChange={(e) => setInputValueDesc(e.target.value)}
                      placeholder="Sua descrição"
                    />
                  </div>
                </div>
                <div className="box-button">
                  <button
                    type="submit"
                    style={{
                      backgroundColor:
                        status === "failed" ? "rgb(255, 70, 70)" : "",
                    }}
                  >
                    {status != "idle" ? "" : "Adicionar Plantio"}
                    {status == "loading" ? (
                      <div className="box-loadingCircleAndSucess">
                        <CircleNotchIcon
                          id="circleIcon"
                          size={32}
                          color="#ffffff"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {status == "success" ? (
                      <div className="box-loadingCircleAndSucess">
                        <CheckIcon
                          id="checkIcon"
                          size={32}
                          color="#ffffff"
                          weight="regular"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {status == "failed" ? (
                      <div className="box-loadingCircleAndSucess">
                        <XIcon
                          id="checkIcon"
                          size={32}
                          color="#ffffff"
                          weight="regular"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
