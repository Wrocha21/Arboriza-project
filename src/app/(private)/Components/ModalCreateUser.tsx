"use client";

interface ModalUserProps {
  setOpenMenu: (value: boolean) => void;
}
import "@/Assets/css/components/modalCreateUser.css";
import {
  CaretDownIcon,
  CheckIcon,
  CircleNotchIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import logoTree from "@/Assets/css/images/Tree.png";
import { useState } from "react";
import { initializeApp, deleteApp, FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";
import { AuthErrors } from "@/app/(auth)/AuthErrors";
import { db } from "@/lib/auth/auth";
import { useAuth } from "@/app/context/AuthContext";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

export default function ModalCreateUser({ setOpenMenu }: ModalUserProps) {
  const [cargoValue, setCargoValue] = useState("");
  const [openModalCargo, setOpenModalCargo] = useState(false);
  const [inputValueEmail, setInputValueEmail] = useState("");
  const [inputValueName, setInputValueName] = useState("");
  const [inputValuePass, setInputValuePass] = useState("");
  const [errorMessage, setErroMessage] = useState<string | undefined>("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failed"
  >("idle");
  const {userName} = useAuth();
  const auth = getAuth();


  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function criarUsuarioSemDeslogar(
    email: string,
    password: string,
    nome: string,
    role: string,
  ) {
    const appSecundario = initializeApp(firebaseConfig, "SecondaryAuthApp");
    const authSecundario = getAuth(appSecundario);

    // Dessa forma, o Firestore saberá que quem está a gravar é o novo utilizador criado
    const dbSecundario = getFirestore(appSecundario);

    try {
      // 3. Cria o utilizador na instância secundária
      const userCredential = await createUserWithEmailAndPassword(
        authSecundario,
        email,
        password,
      );
      const novoUsuario = userCredential.user;

      // 4. Cria o documento no Firestore usando o dbSecundario
      // Agora: request.auth.uid (novoUsuario.uid) == userId (novoUsuario.uid). A regra vai aceitar!
      const userDocRef = doc(dbSecundario, "usuarios", novoUsuario.uid);
      await setDoc(userDocRef, {
        uid: novoUsuario.uid,
        email: email,
        nome: nome,
        role: role,
        photoURL: "",
        createdAt: new Date(),
      });
      await addDoc(collection(dbSecundario, "logs"), {
        tipo: "usuario",
        acao: "CREATE",
        usuarioCriadoUid: novoUsuario.uid,
        usuarioCriadoEmail: email,
        usuarioNome: inputValueName,
        usuarioCargo: cargoValue,
        executadoPor: userName,
        executadoPorId: auth.currentUser?.uid || "",
        timestamp: new Date(),
      });

      // 5. Desloga o utilizador da instância secundária e limpa o app temporário
      await signOut(authSecundario);
      await deleteApp(appSecundario);

      return { success: true, uid: novoUsuario.uid };
    } catch (error) {
      console.log(error)
      try {
        await deleteApp(appSecundario);
      } catch (_) {}

      throw error;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setStatus("loading");
      await delay(500);
      if (
        inputValueEmail.length === 0 ||
        inputValueName.length === 0 ||
        inputValuePass.length === 0 ||
        cargoValue.length === 0
      ) {
        setStatus("failed");
        await delay(2000);
        setStatus("idle");
        return;
      }

      await criarUsuarioSemDeslogar(
        inputValueEmail,
        inputValuePass,
        inputValueName,
        cargoValue,
      );
      setStatus("success");
      await delay(2000);
      setOpenMenu(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = AuthErrors(error.code);
        setErroMessage(errorMessage);
      } else {
        setErroMessage("Erro desconhecido");
      }
      setStatus("failed");
    } finally {
      setTimeout(() => {
        setErroMessage("");
        setStatus("idle");
      }, 3000);
    }
  };

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
              <form onSubmit={handleSubmit}>
                <div className="box-inputEmail">
                  <span>Nome do usuário</span>
                  <div
                    className="input"
                    style={{
                      border:
                        inputValueName ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
                      onChange={(e) => setInputValueName(e.target.value)}
                      placeholder="Nome do usuário"
                    />
                  </div>
                </div>
                <div className="box-inputEmail">
                  <span>Email do Usuário</span>
                  <div
                    className="input"
                    style={{
                      border:
                        inputValueEmail  ? "1px solid black" : "",
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
                        inputValuePass ? "1px solid black" : "",
                    }}
                  >
                    <input
                      type="text"
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
                        border: cargoValue ? "1px solid black" : "",
                      }}
                    >
                      <div className="box-info">
                        <input
                          type="text"
                          value={cargoValue}
                          placeholder={"Cargo"}
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
                  <button
                    type="submit"
                    style={{
                      backgroundColor:
                        status === "failed" ? "rgb(255, 70, 70)" : "",
                    }}
                  >
                    {status != "idle" ? "" : "Criar Usuário"}
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
                  <p>
                    {!errorMessage && status === "failed"
                      ? "ops! parece que você se esqueceu de preencher o formulário."
                      : errorMessage}
                  </p>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
