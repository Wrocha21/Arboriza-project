export interface UserLogsProps {
  id: string;
  tipo: string;
  acao: string;
  usuarioCriadoUid: string;
  usuarioCriadoEmail: string;
  usuarioNome: string;
  usuarioCargo: string;
  executadoPor: string;
  executadoPorId: string;
 timestamp: { seconds: number; nanoseconds: number } | any;
}

export interface PlantLogsProps {
  id: string;
  tipo: string;
  acao: string;
  executadoPor: string;
  executadoPorId: string;
  timestamp: { seconds: number; nanoseconds: number } | any;
}
