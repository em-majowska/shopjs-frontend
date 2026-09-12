import SignupForm from "@/components/SignupForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Créer un compte — Maison Lumière",
  description:
    "Créez votre compte Maison Lumière pour commander vos soins préférés.",
};

const SignupPage = () => {
  return (
    <main className="content main flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <p className="label text-rose-foreground">Bienvenue</p>
        <h1 className="font-display text-4xl font-medium md:text-5xl">
          Créer un compte
        </h1>
        <p className="text-muted-foreground text-sm">
          Quelques instants suffisent pour rejoindre la maison.
        </p>
      </div>
      <SignupForm />
      <p className="text-muted-foreground text-sm">
        Déjà un compte ?{" "}
        <Link
          href="/users/login"
          className="text-foreground font-medium underline hover:cursor-pointer"
        >
          Se connecter
        </Link>
      </p>
    </main>
  );
};

export default SignupPage;
