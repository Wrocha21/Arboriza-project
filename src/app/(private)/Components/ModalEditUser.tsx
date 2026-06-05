"use client";

import { db } from "@/lib/auth/auth";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import "@/Assets/css/components/modalEditUser.css";
import {
  CaretDownIcon,
  CheckIcon,
  CircleNotchIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import logoTree from "@/Assets/css/images/Tree.png";
import { useState } from "react";
import defaultProfile from "@/Assets/css/images/avatarPadrao.png"

interface UserProps {
  id: string;
  nome: string;
  email?: string;
  role: string;
  photoURL?: string
}

interface ModalUserProps {
  setOpenMenu: (value: boolean) => void;
  userData: UserProps;
}

export default function ModalEditUser({
  setOpenMenu,
  userData,
}: ModalUserProps) {

  const [cargoValue, setCargoValue] = useState(userData.role);
  const [openModalCargo, setOpenModalCargo] = useState(false);
  const [inputValueName, setInputValueName] = useState<string | undefined>(userData.nome,);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleUpdateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userData?.id) return;
    setStatus("loading");
    await delay(500);

    try {
      const userRef = doc(db, "usuarios", userData.id);
      await updateDoc(userRef, {
        nome: inputValueName,
        role: cargoValue,
      });
      


      setStatus("success");
      await delay(2000);
      setOpenMenu(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    } finally {
      setStatus("idle");
    }
  }

  function modalCargoIsOpen() {
    setOpenModalCargo((prev) => !prev);
  }

  return (
    <>
      <div className="containerModal">
        <div className="boxModal">
          <div className="modal">
            <div className="box-info">
              <Image src={logoTree} width={57} height={57} alt=""></Image>
              <span>EDITAR USUÁRIO</span>
              <XIcon
                size={32}
                color="#000000"
                onClick={() => setOpenMenu(false)}
              />
            </div>
            <div className="box-perfilEditUser">
              <Image src={userData.photoURL&& userData.photoURL.trim() !== "" ? userData.photoURL : defaultProfile} width={300} height={300} alt=""></Image>
            </div>
            <div className="container-inputs">
              <form onSubmit={handleUpdateUser}>
                <div className="box-inputEmail">
                  <span>Nome do usuário</span>
                  <div
                    className="input"
                    style={{
                      border: inputValueName ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
                      onChange={(e) => setInputValueName(e.target.value)}
                      placeholder="Nome"
                      value={inputValueName}
                    />
                  </div>
                </div>
                <div className="container-Cargo">
                  <div className="box-cargo">
                    <span>Cargo</span>
                    <div
                      className="box-input"
                      style={{
                        border: cargoValue === "Cargo" ? "" : "1px solid black",
                      }}
                    >
                      <div className="box-info">
                        <input
                          type="text"
                          value={cargoValue}
                          style={{
                            color: cargoValue != "Cargo" ? "black" : "",
                          }}
                          disabled
                        />
                        <CaretDownIcon
                          size={32}
                          weight="light"
                          onClick={modalCargoIsOpen}
                        />
                      </div>

                      <div
                        className={`box-cargoOpt ${openModalCargo ? "open" : ""}`}
                      >
                        <ul>
                          <li
                            onClick={() => {
                              setCargoValue("equipe");
                              setOpenModalCargo(false);
                            }}
                          >
                            Equipe
                          </li>
                          <li
                            onClick={() => {
                              setCargoValue("admin");
                              setOpenModalCargo(false);
                            }}
                          >
                            Admin
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-button">
                  <button type="submit">
                    {status != "idle" ? "" : "Atualizar"}
                    {status == "loading" ? (
                      <div className="box-loadingEdit">
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
                      <div className="box-loadingEdit">
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
                  </button>
                  <button type="button" id="deleteUserButton">
                    <span>Excluir Usuário</span>
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
