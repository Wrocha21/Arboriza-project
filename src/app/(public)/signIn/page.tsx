"use client";

import logoArboriza from "../../Assets/css/images/LOGO.png";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUDownLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  PasswordIcon,
  UserIcon,
} from "@phosphor-icons/react";
import "../../Assets/css/components/signIn.css";
import { useState } from "react";

import { useRouter } from "next/navigation";
export default function SignIn() {
  const [viewPass, setViewPass] = useState(false);
  const [valueInputUser, setValueInputUser] = useState("");
  const [valueInputPass, setValueInputPass] = useState("");
  const router = useRouter();

  function HandleViewPass() {
    setViewPass(!viewPass);
  }
  function HandleClickArrow() {
   router.push('/')
  }
  return (
    <>
      <div className="Container-SignIn">
        <div className="navbar">
          <Image
            src={logoArboriza}
            width={124}
            height={57}
            alt="LogoArboriza"
          />
          <ArrowUDownLeftIcon size={29} color="#383333" onClick={HandleClickArrow}/>
        </div>
        <div className="box-Login">
          <div className="titles">
            <h4>ACESSO AO SISTEMA</h4>
            <span>Painel interno do projeto</span>
          </div>
          <div className="login">
            <div
              className="inputUser"
              style={{
                border: valueInputUser.length > 0 ? "1px solid black" : "",
              }}
            >
              <UserIcon size={29} color="#383333" />
              <input
                type="text"
                placeholder="example@gmail.com"
                value={valueInputUser}
                onChange={(t) => setValueInputUser(t.target.value)}
              />
            </div>
            <div
              className="inputPass"
              style={{
                border: valueInputPass.length > 0 ? "1px solid black" : "",
              }}
            >
              <PasswordIcon size={29} color="#383333" />
              <input
                type={viewPass === false ? "password" : "text"}
                placeholder="Senha"
                value={valueInputPass}
                onChange={(t) => setValueInputPass(t.target.value)}
              />
              <div className="box-View" onClick={HandleViewPass}>
                {viewPass === true ? (
                  <EyeIcon size={26} color="#383333" />
                ) : (
                  <EyeSlashIcon size={26} color="#383333" />
                )}
              </div>
            </div>
            <div className="buttonLogin">
              <button>Acessar Sistema</button>
            </div>
          </div>
          <div className="info">
            <div className="title">
              <LockKeyIcon size={24} color="#6c6c6c" weight="fill" />
              <p>
                Sistema de uso interno. Contas são criadas pelo administrador do
                projeto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
