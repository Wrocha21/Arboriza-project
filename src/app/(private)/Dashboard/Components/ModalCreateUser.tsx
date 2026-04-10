"use client";

interface ModalUserProps {
  setOpenMenu: (value: boolean) => void;
}

import { CaretDownIcon, XIcon } from "@phosphor-icons/react";
import Image from "next/image";
import logoTree from "../../../Assets/css/images/Tree.png";
import { useState } from "react";

export default function ModalCreateUser({ setOpenMenu }: ModalUserProps) {
  const [cargo, setCargo] = useState("Cargo");
  const [openModalCargo, setOpenModalCargo] = useState(false);

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
              <div className="box-inputEmail">
                <span>Email do Usuário</span>
                <div className="input">
                  <input type="text" placeholder="example@gmail.com" />
                </div>
              </div>
              <div className="box-inputPass">
                <span>Senha do Usuário</span>
                <div className="input">
                  <input type="password" placeholder="Senha" />
                </div>
              </div>
              <div className="box-Date">
                <div className="box-cargo">
                  <span>Cargo</span>
                  <div className="box-input">
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
                    {openModalCargo && (
                      <div className="box-cargoOpt">
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
                    )}
                  </div>
                </div>
                <div className="box-inputDate">
                  <span>Date</span>
                  <div className="box-input">
                    <input type="date" />
                  </div>
                </div>
              </div>
              <div className="box-button">
                <button>CRIAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
