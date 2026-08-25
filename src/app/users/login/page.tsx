import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Se connecter — Maison Lumière",
  description: "Connectez-vous à votre compte Maison Lumière.",
};
const LoginPage = () => {
  return (
    <main className="content main flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <p className="label text-rose-foreground">Heureux de vous revoir</p>
        <h1 className="font-display text-4xl font-medium md:text-5xl">
          Se connecter
        </h1>
        <p className="text-muted-foreground text-sm">
          Retrouvez votre panier et finalisez votre commande.
        </p>
      </div>
      <LoginForm />
      <p className="text-muted-foreground text-sm">
        Pas encore de compte ?{" "}
        <Link
          href="/users/signup"
          className="text-foreground font-medium underline hover:cursor-pointer"
        >
          Créer un compte
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
