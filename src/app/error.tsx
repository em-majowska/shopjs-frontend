"use client";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-foreground text-3xl font-semibold tracking-tight">
          Cette page n&apos;a pas pu se charger
        </h1>
        <p className="text-muted-foreground text-md mt-2">{error.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-5">
          <button onClick={() => reset()} className="btn-primary">
            Réessayer
          </button>
          <Link href="/" className="btn-outline">
            Accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
