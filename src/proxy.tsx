import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;


  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (session) {
    try {
      const payloadBase64 = session.split(".")[1];
      if (!payloadBase64) throw new Error("Token inválido");
      const projectID = "autharboriza-d64a0";

      const payloadString = Buffer.from(payloadBase64, "base64").toString(
        "utf-8",
      );
      const payload = JSON.parse(payloadString);

      const uid = payload.sub;
      const url = `https://firestore.googleapis.com/v1/projects/${projectID}/databases/(default)/documents/usuarios/${uid}`;

      const res = await fetch(url, { cache: "no-store" });

      if (res.status === 404) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("session");
        throw new Error("Usuário não existe mais no banco de dados.");
      }

      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {

      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage === "Token inválido") {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("session");
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard", "/dashboard/:path*"],
};
