"use client";

import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/auth/auth";
import { CameraIcon } from "@phosphor-icons/react";

interface UploadFotoProps {
  userId: string;
}

export default function UploadFoto({ userId }: UploadFotoProps) {
  const [carregando, setCarregando] = useState(false);
  const handleMudarFoto = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) return;
    setCarregando(true);
    try {
      // 1. Pede a URL assinada para a nossa API do Next.js
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          fileName: arquivo.name,
          fileType: arquivo.type,
        }),
      });
      if (!response.ok) throw new Error("Erro ao pedir permissão de upload.");
      const { presignedUrl, objectKey } = await response.json();
      const uploadR2 = await fetch(presignedUrl.toString(), {
        method: "PUT",
        body: arquivo,
        headers: {},
      });
      if (!uploadR2.ok)
        throw new Error("Erro ao enviar arquivo para o Cloudflare.");
      // 3. Monta a URL final da foto usando a variável pública do .env
      const urlFinalDaImagem = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${objectKey}`;
      console.log("ID enviado pelo componente:", userId);
      // 4. Salva esse link direto no Firestore do usuário
      const usuarioRef = doc(db, "usuarios", userId);
      await updateDoc(usuarioRef, {
        photoURL: urlFinalDaImagem,
      });

      alert("Foto atualizada com sucesso!");
    } catch (erro) {
      console.error(erro);
      alert("Falha no upload da imagem.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="Container-uploadFoto">
      <label htmlFor="foto-input" className="box-inputFoto">
        <CameraIcon width={24} height={24} weight="fill" color="white"/>
      </label>
        <input
          id="foto-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleMudarFoto}
          disabled={carregando}
        />
    </div>
  );
}
