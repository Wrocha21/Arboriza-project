import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/auth/auth";// Ajuste o caminho do seu arquivo de configuração do Firebase

export const deleteOldLogs = async () => {
  try {
    // 1. Calcula a data limite (7 dias atrás)
    const umaSemanaAtras = new Date();
    umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7);

    // 2. Faz uma busca trazendo APENAS os logs criados ANTES de 7 dias atrás
    const logsRef = collection(db, "logs");
    const q = query(logsRef, where("timestamp", "<", umaSemanaAtras));
    
    const querySnapshot = await getDocs(q);

    // 3. Deleta os documentos encontrados um por um em segundo plano
    const deletando = querySnapshot.docs.map((documento) => 
      deleteDoc(doc(db, "logs", documento.id))
    );

    // Aguarda todas as deleções terminarem
    await Promise.all(deletando);
    
    console.log(`${querySnapshot.size} logs antigos foram deletados com sucesso.`);
  } catch (error) {
    console.error("Erro ao deletar logs antigos:", error);
  }
};