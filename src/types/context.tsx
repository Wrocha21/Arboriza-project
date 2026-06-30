import { PlantLogsProps } from "./logs";

export interface AuthContextType {
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
  logs: PlantLogsProps[];
  plants: PlantLogsProps[];
}

export interface Usuario {
  id: string;
  nome: string;
  role: string;
  email?: string;
  photoURL?: string;
  userId: string;
}