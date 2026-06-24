"use client";

import NavbarDashboard from "@/app/(private)/Components/NavbarDashboard";
import { AuthProvider } from "@/app/context/AuthContext";
import { AppWindowIcon } from "@phosphor-icons/react";

export function LogsContent() {
  return (
    <>
      <NavbarDashboard />
      <div className="container-logs">
        <div className="titleSection">
          <AppWindowIcon width={24} height={24} color="green" />
          <div className="box-title">
            <h3>Histórico do sistema</h3>
            <span>Tudo o que está acontecendo nos bastidores</span>
          </div>
        </div>
        <div className="box-logs"></div>
      </div>
    </>
  );
}

export default function Logs() {
  return (
    <AuthProvider>
      <LogsContent />
    </AuthProvider>
  );
}
