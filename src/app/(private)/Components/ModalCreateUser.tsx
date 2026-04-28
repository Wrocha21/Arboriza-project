"use client";

interface ModalUserProps {
  setOpenMenu: (value: boolean) => void;
}

import { CaretDownIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import logoTree from "@/Assets/css/images/Tree.png";
import { useState } from "react";

export default function ModalCreateUser({ setOpenMenu }: ModalUserProps) {
  const [cargo, setCargo] = useState("Cargo");
  const [openModalCargo, setOpenModalCargo] = useState(false);
  const [inputValueEmail, setInputValueEmail] = useState("");
  const [inputValuePass, setInputValuePass] = useState("");

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
              <span>CRIAR CONTA</span>
              <XIcon
                size={32}
                color="#000000"
                onClick={() => setOpenMenu(false)}
              />
            </div>
            <div className="container-inputs">
              <form>
                <div className="box-inputEmail">
                  <span>Email do Usuário</span>
                  <div
                    className="input"
                    style={{
                      border:
                        inputValueEmail.length > 0 ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
                      onChange={(e) => setInputValueEmail(e.target.value)}
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div className="box-inputPass">
                  <span>Senha do Usuário</span>
                  <div
                    className="input"
                    style={{
                      border:
                        inputValuePass.length > 0 ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="password"
                      onChange={(e) => setInputValuePass(e.target.value)}
                      placeholder="Senha"
                    />
                  </div>
                </div>
                <div className="container-Cargo">
                  <div className="box-cargo">
                    <span>Cargo</span>
                    <div
                      className="box-input"
                      style={{
                        border: cargo === "Cargo" ? "" : "1px solid black",
                      }}
                    >
                      <div className="box-info">
                        <input
                          type="text"
                          value={cargo}
                          style={{ color: cargo != "Cargo" ? "black" : "" }}
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
                              setCargo("Equipe");
                              setOpenModalCargo(false);
                            }}
                          >
                            Equipe
                          </li>
                          <li
                            onClick={() => {
                              setCargo("Administrador");
                              setOpenModalCargo(false);
                            }}
                          >
                            Administrador
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-button">
                  <button type="submit">CRIAR</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
