"use client";
import Link from "next/link";

export default function Error({ error }: { error: Error; reset: () => void }) {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="flex max-w-lg flex-col gap-4 text-center">
        <h1 className="font-display text-foreground text-5xl font-semibold tracking-tight">
          Accès refusé
        </h1>
        <p className="text-muted-foreground text-md mt-2">{error.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-5">
          <Link href="/" className="btn-outline">
            Accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
