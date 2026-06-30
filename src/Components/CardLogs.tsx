import React from "react";

import { PlantLogsProps, UserLogsProps } from "@/types/logs";
import { formatLogDate } from "@/app/(private)/Components/formattDate";
import "@/Assets/css/components/plantLogItem.css";
import { Plant, UserIcon } from "@phosphor-icons/react";

interface PlantLogItemProps {
  log: PlantLogsProps | UserLogsProps;
}



const actionDetails: Record<string, Record<string,{ title: string; className: string }>> = {
  plantio: {
    CREATE: { title: "Novo plantio registrado", className: "badge-create" },
    UPDATE: { title: "Plantio atualizado", className: "badge-update" },
    DELETE: { title: "Plantio removido", className: "badge-delete" },
  },
  usuario: {
    CREATE: { title: "Novo usuário registrado", className: "badge-create" },
    UPDATE: { title: "Usuário atualizado", className: "badge-update" },
    DELETE: { title: "Usuário removido", className: "badge-delete" },
  }
};

export const PlantLogItem: React.FC<PlantLogItemProps> = ({ log }) => {


const currentAction = actionDetails[log.tipo]?.[log.acao] || {
  title: log.tipo === "usuario" ? "Ação realizada no usuário" : "Ação realizada no plantio",
  className: "badge-default",
};
  const formattedDate = formatLogDate(log.timestamp);
  return (
    <div className="log-card">
      <div className="log-card-left">
        <div className={`log-icon-container ${currentAction.className}`}>
          {log.tipo !== "plantio" ? <UserIcon width={24} height={24}/> : <Plant width={24} height={24}/>}
        </div>
        <div className="log-info">
          <h4 className="log-title">{currentAction.title}</h4>
          <p className="log-subtitle">Por: {log.executadoPor || "Usuário"}</p>
        </div>
      </div>
      <div className="log-card-right">
        <span className="log-date" suppressHydrationWarning>{formattedDate}</span>
      </div>
    </div>
  );
};
