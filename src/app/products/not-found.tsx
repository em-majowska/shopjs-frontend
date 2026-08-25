import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-foreground text-7xl font-semibold">
          404
        </h1>
        <h2 className="text-foreground mt-4 text-xl font-semibold">
          Ce produit n&apos;existe plus
        </h2>
        <p className="text-muted-foreground text-md mt-2">
          Le produit que vous cherchez n&apos;est plus disponible.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
          <Link href="/products" className="btn-primary">
            Découvrir la boutique
          </Link>
          <Link href="/" className="btn-outline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
