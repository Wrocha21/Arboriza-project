"use client";

import { useRouter } from "next/navigation";
import {useState} from "react";
import { auth } from "@/lib/auth/auth";
import { AuthProvider, useAuth } from "@/app/context/AuthContext";

import DashboardTitle from "@/components/DashboardTitle";
import "@/Assets/css/global.css";
import "@/Assets/css/components/equipeDash.css";

import {
  ArrowUDownLeftIcon,
  MagnifyingGlassIcon,
  DotsThreeOutlineIcon
} from "@phosphor-icons/react";

interface UserProps {
  id: string;
  nome: string;
  email?: string;
  role: string;
  photoURL?: string
}

import Image from "next/image";
import ModalEditUser from "../../components/ModalEditUser";
import defaultProfile from "@/Assets/css/images/avatarPadrao.png"

export function EquipeContent() {
  const router = useRouter();

  const { userName, roleUser, usuarios } = useAuth();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [sameAuthId, setSameAuthId] = useState<boolean>()

  const [pagination, setPagination] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  const itensPorPagina = 3;
  const backPage = pagination * itensPorPagina;
  const nextPage = backPage + itensPorPagina;

  const usuariosFiltrados = usuarios.filter((user) => {
    const nomeUsuario = user.nome.toLowerCase();
    const textoBuscado = inputSearchValue.toLowerCase();

    return nomeUsuario.includes(textoBuscado);
  });

  function nextPageHandle() {
    const proximoIndice = (pagination + 1) * itensPorPagina;

    if (proximoIndice >= usuarios.length) {
      return;
    }
    setPageNumber((prev) => prev + 1);
    setPagination((prev) => prev + 1);
  }

  function backPageHandle() {
    if (pagination <= 0) return;

    setPagination((prev) => prev - 1);
    setPageNumber((prev) => prev - 1);
  }

  function isTheSameId(user : UserProps){
    setCurrentUser(user)
    setOpenModalDelete(true)
  }

  return (
    <>
      <div className="container-equipe">
        <DashboardTitle
          title="Equipe"
          arrowBack={ArrowUDownLeftIcon}
          username={userName}
          hasAction={() => router.push("/dashboard")}
          desc="Veja os integrantes da equipe"
        />
        <div className="container-users">
          <div className="box-search"
            style={{
              border: inputSearchValue.length > 0 ? "1px solid black" : "",
            }}
          >
          <div className="box-icon">
            <MagnifyingGlassIcon width={24} height={24} alt="" />
          </div>

            <input
              type="text"
              name="search"
              id="search"
              value={inputSearchValue}
              onChange={(e) => setInputSearchValue(e.target.value)}
              placeholder="Buscar"
            />
          </div>
          <div className="box-users">
            {usuariosFiltrados.slice(backPage, nextPage).map((user, index) => {
                const ehOMesmoUsuario = user.id === auth.currentUser?.uid;

                return (
                  <div key={index} className={`userBox`} onClick={() => {
                    isTheSameId(user)
                    setSameAuthId(ehOMesmoUsuario)
                    }}>
                    <div className="box-perfil">
                      <div className="circle">
                        <Image src={user.photoURL && user.photoURL.trim() !== "" ? user.photoURL : defaultProfile} width={120} height={120} alt=""/>
                      </div>
                      <div className="box-text">
                        <p>
                          {user.nome[0].toLocaleUpperCase() +
                            user.nome.slice(1)}
                          {ehOMesmoUsuario && (
                            <span id="userValidate"> (Você)</span>
                          )}
                        </p>

                        <span>
                          {user.role[0].toLocaleUpperCase() +
                            user.role.slice(1)}
                        </span>

                        <span id="emailText">{user.email}</span>

                      </div>
                    </div>
                    {roleUser === "admin" && !ehOMesmoUsuario && (
                      <div className="box-actions">
                        <DotsThreeOutlineIcon weight="fill" width={24} height={24} color="#727272"/>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="box-pagination">
            <div className="box-numberPage">
              <div className="numberPage">
                <span>{pageNumber}</span>
              </div>
              <span>Mostando 1-3 de {usuarios.length} integrantes</span>
            </div>
            <div className="box-buttons">
              <button
                id="backPage"
                disabled={pagination === 0}
                onClick={backPageHandle}
              >
                Voltar
              </button>
              <button id="nextPage" onClick={nextPageHandle}>
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModalDelete && currentUser && !sameAuthId && (
        <ModalEditUser setOpenMenu={setOpenModalDelete} userData={currentUser} />
      )}

    </>
  );
}

export default function Equipe() {
  return (
    <AuthProvider>
      <EquipeContent />
    </AuthProvider>
  );
}
