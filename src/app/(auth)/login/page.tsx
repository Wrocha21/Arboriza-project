"use client";

import logoArboriza from "@/Assets/css/images/LOGO.png";
import Image from "next/image";
import {
  ArrowUDownLeftIcon,
  CircleNotchIcon,
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  PasswordIcon,
  UserIcon,
} from "@phosphor-icons/react";
import "../../../Assets/css/components/signIn.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/auth/auth";

import { useRouter } from "next/navigation";
import { AuthErrors } from "../AuthErrors";
import { FirebaseError } from "firebase/app";


export default function SignIn() {
  const [viewPass, setViewPass] = useState(false);
  const [valueInputUser, setValueInputUser] = useState("");
  const [valueInputPass, setValueInputPass] = useState("");
  const [loading,setLoading] = useState(false)
  const [authError, setAuthError] = useState<string | undefined>("");
  const router = useRouter();

  function HandleViewPass() {
    setViewPass(!viewPass);
  }
  function HandleClickArrow() {
    router.push("/");
  }
  async function authLogin(email: string, password: string) {

    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      // JEITO NATIVO: Criando o cookie sem bibliotecas
      // 'path=/' é vital para o middleware conseguir ler em qualquer pasta
      document.cookie = `session=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMenssage = AuthErrors(error.code);
        setAuthError(errorMenssage);
      } else {
        setAuthError("Ocorreu um erro inesperado.");
      }
    } finally{
      setLoading(false)
    }
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
          <ArrowUDownLeftIcon
            size={29}
            color="#383333"
            onClick={HandleClickArrow}
          />
        </div>
        <div className="box-Login">
          <div className="titles">
            <h4>ACESSO AO SISTEMA</h4>
            <span>Painel interno do projeto</span>
          </div>
          <div className="login">
            <div className={`inputUser ${ authError === "E-mail inválido." || authError === "Email ou senha incorretos."
                  ? "input-error"
                  : valueInputUser.length > 0
                    ? "input-filled"
                    : ""
              }`}
            >
              <UserIcon size={29} color="#383333" />
              <input
                type="text"
                placeholder="example@gmail.com"
                value={valueInputUser}
                onChange={(t) => {
                  setValueInputUser(t.target.value);
                  setAuthError("");
                }}
              />
            </div>
            <div className={`inputPass ${ authError === "Por favor Informe sua senha" || authError=== "Email ou senha incorretos." ? "input-error" : 
                valueInputPass.length > 0 ? "input-filled" : ""}`}
            >
              <PasswordIcon size={29} color="#383333" />
              <input
                type={viewPass === false ? "password" : "text"}
                placeholder="Senha"
                value={valueInputPass}
                onChange={(t) => {
                  setValueInputPass(t.target.value);
                  setAuthError("");
                }}
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
              <button onClick={() => authLogin(valueInputUser, valueInputPass)}>
                {!loading ? "Acessar o sistema" : <CircleNotchIcon className="spin" size={20} /> }
              </button>
            </div>
          </div>
          <div className="box-error">
            <p>{authError}</p>
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
