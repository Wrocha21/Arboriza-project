export const AuthErrors = (code: string) => {
  switch (code) {
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/email-already-in-use":
      return "Este email já esta em uso";
    case "auth/user-disabled":
      return "Este usuário foi desativado.";
    case "auth/user-not-found":
      return "Conta não encontrada"
    case "auth/wrong-password":
      return "Senha incorreta."
    case "auth/invalid-credential":
      return "Email ou senha incorretos." // Novo padrão unificado do Firebase
    case "auth/too-many-requests":
      return "Muitas tentativas falhas. Tente novamente mais tarde.";

    default:
  }
};
