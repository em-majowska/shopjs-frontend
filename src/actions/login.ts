"use server";

import api from "@/features/api/api";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";

const handleLogin = async (
  formData: FormData,
): Promise<{ error: null | string; isAdmin: boolean }> => {
  try {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    if (!email || !password || email === "" || password === "") {
      throw new Error("Veuillez remplir tous les champs obligatoires");
    }
    const { data } = await api.post("/user/login", { email, password });
    const token = data.token;

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 14,
    });
    return { error: null, isAdmin: data.admin };
  } catch (e) {
    if (isAxiosError(e)) {
      return { error: "Identifiants invalides.", isAdmin: false };
    }
    if (e instanceof Error) {
      return { error: e.message, isAdmin: false };
    }
    return {
      error: "Une erreur inattendue est survenue. Veuillez réessayer.",
      isAdmin: false,
    };
  }
};

export default handleLogin;
