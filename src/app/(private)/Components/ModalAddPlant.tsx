"use client";

import "@/Assets/css/components/modalCreateUser.css";
import { CheckIcon, CircleNotchIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import logoTree from "@/Assets/css/images/Tree.png";
import React, { useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/auth/auth";
import { useAuth } from "@/app/context/AuthContext";
import { Plantio } from "@/types/plantio";

interface ModalPlantProps {
  setOpenMenu: (value: boolean) => void;
  latitude: number;
  longitude: number;
  modo: "create" | "edit";
  plantio?: Plantio | null;
}
export default function ModalAddPLant({
  setOpenMenu,
  latitude,
  longitude,
  modo,
  plantio,
}: ModalPlantProps) {
  const [inputValueLatitude, setInputValueLatitude] = useState<number | string>(
    latitude,
  );
  const [inputValueLongitude, setInputValueLongitude] = useState<
    number | string
  >(longitude);
  const [inputValueEspecie, setInputValueEspecie] = useState(
    plantio?.especie || "",
  );

  const [inputValueDesc, setInputValueDesc] = useState(plantio?.desc || "");

  const [inputValueQuant, setInputValueQuant] = useState(
    plantio?.quantidade?.toString() || "",
  );

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failed"
  >("idle");
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const { userName } = useAuth();

  async function addPlantDb(e: React.FormEvent) {
    e.preventDefault();
    try {
      const especieFormatada = inputValueEspecie
        .replace(/\s*[---]\s*/g, "-") // Remove espaços antes e depois do hífen
        .trim();

      setStatus("loading");
      await delay(500);
      if (!inputValueEspecie) {
        setStatus("failed");
        await delay(2000);
        setStatus("idle");
        return;
      }

      await addDoc(collection(db, "plantios"), {
        lat: latitude,
        lng: longitude,
        especie: especieFormatada,
        desc: inputValueDesc,
        quantidade: inputValueQuant,
        responsavel: userName,
        data: new Date().toLocaleDateString("pt-BR"),
      });
      await addDoc(collection(db, "logs"), {
        tipo: "newPlanting",
        executadoPor: userName,
        executadoPorId: auth.currentUser?.uid || "",
        timestamp: new Date(),
      });

      setStatus("success");
      await delay(2000);
    } catch (error) {
      console.log("erro ao adicionar um plantio", error);
    } finally {
      setStatus("idle");
    }
  }
  async function updatePlantDb() {
    try {
      if (!plantio?.id) {
        setStatus("failed");
        console.log("Plantio ID indefinido");
        return;
      }
      if (inputValueEspecie.length === 0 || Number(inputValueQuant) === 0) {
        setStatus("failed");
        await delay(2000);
        setStatus("idle");
        return;
      }
      setStatus("loading");

      await updateDoc(doc(db, "plantios", plantio.id), {
        especie: inputValueEspecie,
        descricao: inputValueDesc,
        quantidade: Number(inputValueQuant),
        dataAtualizacao: new Date(),
      });
      await addDoc(collection(db, "logs"), {
        tipo: "plantEdit",
        executadoPor: userName,
        executadoPorId: auth.currentUser?.uid || "",
        timestamp: new Date(),
      });

      setStatus("success");
      await delay(2000);
      setOpenMenu(false);
    } catch (error) {
      setStatus("failed");
      console.log(error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (modo === "create") {
      await addPlantDb(e);
    } else {
      await updatePlantDb();
    }
  }

  function statusChange() {
    if (modo === "create") {
      if (status !== "idle") {
        return "";
      } else {
        return "Adicionar Plantio";
      }
    }

    if (modo === "edit") {
      if (status !== "idle") {
        return "";
      } else {
        return "Editar Plantio";
      }
    }
  }

  const isSubmitDisabled =
    modo === "create"
      ? !inputValueEspecie.trim() || !inputValueQuant.trim()
      : inputValueEspecie === plantio?.especie &&
        Number(inputValueQuant) === plantio?.quantidade;

  return (
    <>
      <div className="containerModal" id="AddPlantContainer">
        -
        <div className="boxModal">
          <div className="modal">
            <div className="box-info">
              <Image src={logoTree} width={57} height={57} alt=""></Image>
              <span>
                {modo === "create" ? "CRIAR PLANTIO" : "EDITAR PLANTIO"}
              </span>
              <XIcon
                size={32}
                color="#000000"
                onClick={() => setOpenMenu(false)}
              />
            </div>
            <div className="container-inputs">
              <form onSubmit={handleSubmit}>
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
                      value={
                        modo === "edit"
                          ? plantio?.lat.toFixed(6)
                          : latitude.toFixed(6)
                      }
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
                      value={
                        modo === "edit"
                          ? plantio?.lng.toFixed(6)
                          : longitude.toFixed(6)
                      }
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
                      border:
                        inputValueEspecie.trim() !== ""
                          ? "1px solid black"
                          : "1px solid grey",
                    }}
                  >
                    <input
                      type="text"
                      value={
                        modo === "edit" ? plantio?.especie : inputValueEspecie
                      }
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
                      border:
                        inputValueQuant.trim() !== ""
                          ? "1px solid black"
                          : "1px solid grey",
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
                      border:
                        inputValueDesc.trim() !== ""
                          ? "1px solid black"
                          : "1px solid grey",
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
                        status === "failed"
                          ? "rgb(255, 70, 70)"
                          : isSubmitDisabled
                            ? "rgb(149, 149, 149)"
                            : "",
                    }}
                    disabled={isSubmitDisabled}
                  >
                    {statusChange()}
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
