"use client";

import handleSignup from "@/actions/handleSignup";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const SignupForm = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const setAuth = useStore((store) => store.setAuth);
  const router = useRouter();

  const [error, formAction, isPending] = useActionState(
    async (_prevError: null | string, formData: FormData) => {
      const error = await handleSignup(formData);

      if (error) return error;

      setAuth();

      router.push("/products");
      return null;
    },
    null,
  );

  return (
    <form
      action={formAction}
      className="border-border bg-card shadow-soft flex flex-col gap-5 rounded-xl border px-6 py-8"
    >
      <label htmlFor="username" className="label text-muted-foreground">
        Nom d&apos;utilisateur
        <input
          type="text"
          name="username"
          id="username"
          placeholder="CamilleDupont123"
          className="field text-foreground"
          required
        />
      </label>

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
      <label htmlFor="confirmPassword" className="label text-muted-foreground">
        Confirmer mot de passe
        <div className="field text-foreground flex">
          <input
            type={showConfirmPwd ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
            className="field-pwd"
            required
          />
          {showConfirmPwd ? (
            <FaEyeSlash
              className="size-5 hover:cursor-pointer"
              onClick={() => setShowConfirmPwd((prev) => !prev)}
            />
          ) : (
            <FaEye
              className="size-5 hover:cursor-pointer"
              onClick={() => setShowConfirmPwd((prev) => !prev)}
            />
          )}
        </div>
      </label>
      {error && <p className="text-destructive fade-up">{error}</p>}
      <button className="btn-primary" disabled={isPending}>
        Créer mon compte
      </button>
    </form>
  );
};

export default SignupForm;
