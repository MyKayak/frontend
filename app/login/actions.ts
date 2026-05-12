"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Compila tutti i campi" };
  }

  try {
    const res = await fetch("https://api.mykayak.fuffo.net/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: email.toString(),
        password: password.toString()
      }),
    });

    if (res.ok) {
      const data = await res.json();
      
      if (!data.token) {
        return { error: "Errore interno: token non generato" };
      }

      const cookieStore = await cookies();
      cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30
      });
      
      redirect("/dashboard");
    } else {
      return { error: "Credenziali non valide" };
    }
  } catch (e) {
    if (e instanceof Error && e.message.includes("NEXT_REDIRECT")) {
      throw e;
    }
    return { error: "Errore di connessione" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/");
}
