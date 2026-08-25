"use server";

import api from "@/features/api/api";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";

const handleSignup = async (formData: FormData) => {
  try {
    const username = formData.get("username")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const confirmPassword = formData.get("confirmPassword")?.toString().trim();

    if (!username || !email || !password || !confirmPassword) {
      throw new Error("Veuillez remplir tous les champs obligatoires");
    }

    if (password !== confirmPassword) {
      throw new Error("Les mots de passe ne correspondent pas.");
    }

    const { data } = await api.post("/user/signup", {
      username,
      email,
      password,
    });

    const token = data.token;

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 14,
    });
    return null;
  } catch (e) {
    if (isAxiosError(e)) {
      return "Identifiants invalides.";
    }
    if (e instanceof Error) {
      return e.message;
    }
    return "Une erreur est survenue. Veuillez réessayer.";
  }
};

export default handleSignup;
