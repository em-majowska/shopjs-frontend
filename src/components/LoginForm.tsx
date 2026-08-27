"use client";

import handleLogin from "@/actions/handleLogin";
import { useStore } from "@/store/store";
import { TLoginFormState } from "@/types";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginForm = () => {
  const [showPwd, setShowPwd] = useState(false);
  const setAuth = useStore((store) => store.setAuth);
  const router = useRouter();

  const login = async (prevState: TLoginFormState, formData: FormData) => {
    const { error, isAdmin } = await handleLogin(prevState, formData);

    if (error) return { error, isAdmin: false };
    setAuth(isAdmin);

    router.push("/products");
    return { error: null, isAdmin: true };
  };

  const [formState, formAction, isPending] = useActionState(login, {
    error: null,
    isAdmin: false,
  });

  const { error } = formState;

  return (
    <form
      action={formAction}
      className="border-border bg-card shadow-soft flex flex-col gap-5 rounded-xl border px-6 py-8"
    >
      <label htmlFor="email" className="label text-muted-foreground">
        Adresse e-mail
        <input
          type="email"
          name="email"
          id="email"
          placeholder="camille@exemple.fr"
          className="field text-foreground"
          required
        />
      </label>
      <label htmlFor="password" className="label text-muted-foreground">
        Mot de passe
        <div className="field text-foreground flex">
          <input
            type={showPwd ? "text" : "password"}
            name="password"
            id="password"
            placeholder="••••••••"
            className="field-pwd"
            required
          />
          {showPwd ? (
            <FaEyeSlash
              className="size-5 hover:cursor-pointer"
              onClick={() => setShowPwd((prev) => !prev)}
            />
          ) : (
            <FaEye
              className="size-5 hover:cursor-pointer"
              onClick={() => setShowPwd((prev) => !prev)}
            />
          )}
        </div>
      </label>
      {error && <p className="text-destructive fade-up">{error}</p>}
      <button className="btn-primary" disabled={isPending}>
        Se connecter
      </button>
    </form>
  );
};

export default LoginForm;
