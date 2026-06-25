import { TreeEvergreenIcon } from "@phosphor-icons/react";
import React, { createContext, useState, ReactNode } from "react";
import { auth, db } from "@/lib/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
  userName: string;
  roleUser: string;
  photoURL: string;
  emailUser: string;
  userId: string;
  setOpenModalPerfil: React.Dispatch<React.SetStateAction<boolean>>;
  openModalPerfil: boolean;
  loading: boolean;
  loadingUsers: boolean;

  usuarios: Usuario[];
}

interface Usuario {
  id: string;
  nome: string;
  role: string;
  email?: string;
  photoURL?: string;
  userId: string;
}

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
  const [openModalPerfil, setOpenModalPerfil] = useState<boolean>(false);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    let unsubscribeSnapshotUser: () => void;
    let unsubscribeSnapshotLista: () => void;

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
      }
    });

    return () => {
      unsubscribe();
      if (unsubscribeSnapshotUser) unsubscribeSnapshotUser();
      if (unsubscribeSnapshotLista) unsubscribeSnapshotLista();
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
        roleUser,
        loading,
        usuarios,
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
