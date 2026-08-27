import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="flex max-w-lg flex-col gap-5 text-center">
        <h1 className="font-display text-foreground text-7xl font-semibold">
          404
        </h1>
        <h2 className="text-foreground mt-4 text-xl font-semibold">
          Page introuvable
        </h2>
        <p className="text-muted-foreground text-md mt-2">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link href="/" className="btn-primary">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
