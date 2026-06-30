export const formatLogDate = (timestampFromFirestore: any): string => {
  if (!timestampFromFirestore) return '';

  // 1. Converte o Timestamp do Firestore para um objeto Date do JavaScript
  // Se já for uma string ou Date, usa o new Date() direto
  const date = timestampFromFirestore.toDate 
    ? timestampFromFirestore.toDate() 
    : new Date(timestampFromFirestore);

  const now = new Date();
  
  // Zera as horas para comparar apenas os dias (Hoje, Ontem, etc)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Formata a hora e minuto (ex: 16:29) com dois dígitos sempre
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const timeString = `${hours}:${minutes}`;

  // 2. Comparações de dias
  if (targetDate.getTime() === today.getTime()) {
    return `Hoje, ${timeString}`;
  } else if (targetDate.getTime() === yesterday.getTime()) {
    return `Ontem, ${timeString}`;
  } else {
    // Para dias anteriores a ontem, mostra o formato padrão de data DD/MM/AAAA
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}, ${timeString}`;
  }
};