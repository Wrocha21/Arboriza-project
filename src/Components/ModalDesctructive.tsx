"use client";

import { AuthProvider, useAuth } from "@/app/context/AuthContext";
import { db } from "@/lib/auth/auth";
import {
  CheckIcon,
  CircleNotchIcon,
  SealWarningIcon,
  XIcon,
} from "@phosphor-icons/react";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

interface ModalDesctructiveProps {
  userNameUser: string;
  userId: string;
  closeModal: () => void;
  closeModalUser: () => void;
}

export default function ModalDesctructive({
  userNameUser,
  userId,
  closeModal,
  closeModalUser,
}: ModalDesctructiveProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "failed"
  >("idle");
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const auth = getAuth();
  const { roleUser, userName } = useAuth();

  const handleConfirmDelete = async () => {
    try {
      setStatus("loading");
      await delay(500);
      const adminLogado = auth.currentUser;

      if (!adminLogado) {
        alert("Você precisa estar logado para realizar esta ação.");
        return;
      }
      if (roleUser !== "admin") {
        return;
      }

      // 1. Pega o Token de Autenticação do Admin atual
      const tokenAdmin = await adminLogado.getIdToken();

      // 2. Envia a requisição com o Token no cabeçalho
      const response = await fetch("/api/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenAdmin}`, // Enviando o token com segurança
        },
        body: JSON.stringify({ uid: userId }), // UID do usuário alvo
      });

      const data = await response.json();

      await addDoc(collection(db, "logs"), {
        tipo: "usuario",
        acao: "DELETE",
        usuarioExcluidoUid: userId,
        usuarioExcluidoNome: userNameUser,
        executadoPor: userName,
        executadoPorId: auth.currentUser.uid,
        timestamp: new Date(),
      });

      if (response.ok) {
        setStatus("success");
        await delay(2000);
        {
          closeModalUser();
        }
      } else {
        setStatus("failed");
        await delay(2000);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <>
      <div className="container-modalDesctructive">
        <div className="box-modal">
          <div className="modal">
            <div className="box-icon">
              <SealWarningIcon size={32} color="#ffffff" />
            </div>
            <div className="box-text">
              <h2>Deletar Conta</h2>
              <span>
                Você está prestes a deletar o usuário {userNameUser}, Tem
                Certeza?
              </span>
            </div>
            <div className="box-button">
              <button id="Confirm" type="button" onClick={handleConfirmDelete}>
                {status != "idle" ? "" : "Sim, Deletar!"}
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
              <button id="Cancel" type="button" onClick={closeModal}>
                Não, Voltar.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
