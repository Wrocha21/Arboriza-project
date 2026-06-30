import { TreeEvergreenIcon } from "@phosphor-icons/react";
import React, { createContext, useState, ReactNode } from "react";
import { auth, db } from "@/lib/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { AuthContextType, Usuario } from "@/types/context";
import { PlantLogsProps, UserLogsProps } from "@/types/logs";

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string>("");
  const [roleUser, setRoleUser] = useState<string>("");
  const [emailUser, setEmailUser] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [logs, setLogs] = useState<PlantLogsProps[] | UserLogsProps[]>([]);
  const [plants, setPlants] = useState<PlantLogsProps[] | UserLogsProps[]>([]);

  const [openModalPerfil, setOpenModalPerfil] = useState<boolean>(false);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    let unsubscribeSnapshotUser: () => void;
    let unsubscribeSnapshotLista: () => void;
    let unsubscribeSnapshotLogs: () => void;
    let unsubscribeSnapshotPlant: () => void;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "usuarios", userId);

        try {
          await user.reload();
          unsubscribeSnapshotUser = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const dadosUser = docSnap.data();
              setUserName(dadosUser.nome);
              setRoleUser(dadosUser.role);
              setPhotoURL(dadosUser.photoURL);
              setEmailUser(dadosUser.email);
              setUserId(user.uid);
            } else {
              auth.signOut();
              document.cookie =
                "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
              window.location.href = "/";
            }
          }); // Retorna os dados em tempo real da coleção de usuários para melhor usabilidade ao admin editar os users

          const usuariosCollectionRef = collection(db, "usuarios");
          unsubscribeSnapshotLista = onSnapshot(
            usuariosCollectionRef,
            (querySnapshot) => {
              const listaUsuarios = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as Usuario[];

              setUsuarios(listaUsuarios);

              setLoadingUsers(false);
            },
            (error) => {
              console.error("Erro ao escutar usuários: ", error);
            },
          ); // Serve como um botão de desligar para evitar que as permissões persista ao mudar o role do user
          const logsCollectionRef = collection(db, "logs");
          unsubscribeSnapshotLogs = onSnapshot(
            logsCollectionRef,
            (querySnapshot) => {
              const listaLogs = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  ...data,
                } as PlantLogsProps; // Tipa cada objeto individualmente aqui
              });

              setLogs(listaLogs);
            },
          );
          const logsCollectionPlants = collection(db, "plantios");
          unsubscribeSnapshotPlant = onSnapshot(
            logsCollectionPlants,
            (querySnapshot) => {
              const listaPlants= querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  ...data,
                } as PlantLogsProps; // Tipa cada objeto individualmente aqui
              });

              setPlants(listaPlants);
            },
          );
        } catch (error) {
          console.log(error);
        } finally {
          await delay(500);
          setLoadingAuth(false);
        }
      } else {
        document.cookie =
          "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        setLoadingAuth(false);

        // Limpa as escutas caso o usuário deslogue
        if (unsubscribeSnapshotUser) unsubscribeSnapshotUser();
        if (unsubscribeSnapshotLista) unsubscribeSnapshotLista();
        if (unsubscribeSnapshotLogs) unsubscribeSnapshotLogs();
        if (unsubscribeSnapshotPlant) unsubscribeSnapshotPlant();
      }
    });

    return () => {
      unsubscribe();
      if (unsubscribeSnapshotUser) unsubscribeSnapshotUser();
      if (unsubscribeSnapshotLista) unsubscribeSnapshotLista();
      if (unsubscribeSnapshotLogs) unsubscribeSnapshotLogs();
      if (unsubscribeSnapshotPlant) unsubscribeSnapshotPlant();
    };
  }, []);

  if (loadingAuth) {
    return (
      <>
        <div className="box-preLoading">
          <TreeEvergreenIcon size={32} weight="fill" color="#green" />
        </div>
      </>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        userName,
        plants,
        roleUser,
        loading,
        usuarios,
        logs,
        photoURL,
        setOpenModalPerfil,
        loadingUsers,
        openModalPerfil,
        userId,
        emailUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }
  return context;
}
