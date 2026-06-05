import { CircleNotchIcon } from "@phosphor-icons/react";
import React, { createContext, useState, ReactNode } from "react";
import { auth, db } from "@/lib/auth/auth";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";

export const AuthContext = createContext({} as AuthContextType);

interface AuthContextType {
  userName: string;
  roleUser: string;
  loading: boolean;
  photoURL: string;
  emailUser: string;
  userId: string;
  setOpenModalPerfil: React.Dispatch<React.SetStateAction<boolean>>;
  openModalPerfil: boolean;
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

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [openModalPerfil, setOpenModalPerfil] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "usuarios", userId);

        try {
          await user.reload();
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const dadosUser = docSnap.data();
            setUserName(dadosUser.nome);
            setRoleUser(dadosUser.role);
            setPhotoURL(dadosUser.photoURL);
            setEmailUser(dadosUser.email);
            setUserId(user.uid);

            const usuariosCollectionRef = collection(db, "usuarios");
            const querySnapshot = await getDocs(usuariosCollectionRef);
            const listaUsuarios = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Usuario[];
            setUsuarios(listaUsuarios);
          } else {
            await auth.signOut();
          }
        } catch (error) {
          console.log(error);
          document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
          await auth.signOut();

          window.location.href = "/";
        } finally {
          setLoading(false);
        }
      } else {

        document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <>
        <div className="box-loading">
          <CircleNotchIcon size={32} color="#7a7a7a" />
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
