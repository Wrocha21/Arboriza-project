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
import { useState } from "react";

export default function ModalAddPLant({
  setOpenMenu,
  latitude,
  longitude,
}: ModalUserProps) {
  const [inputValueLatitude, setInputValueLatitude] = useState<number | string>(
    latitude,
  );
  const [inputValueLongitude, setInputValueLongitude] = useState<
    number | string
  >(longitude);
  const [inputEspecie,setInputEspecie] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

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
                  <span>Latitude</span>
                  <div
                    className="input"
                    style={{
                      border: inputValueLatitude ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
                      value={latitude}
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
                      border: inputValueLatitude ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
                      value={longitude}
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
                      border: inputEspecie ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
                      onChange={(e) => setInputEspecie(e.target.value)}
                      placeholder="Ipê amarelo"
                    />
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
