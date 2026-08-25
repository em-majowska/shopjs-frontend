"use client";
import { useStore } from "@/store/store";
import Link from "next/link";
import { MdOutlineVerifiedUser } from "react-icons/md";
import CartButton from "./CartButton";

const Header = () => {
  const isAuthenticated = useStore((store) => store.isAuthenticated);
  const isAdmin = useStore((store) => store.isAdmin);
  const logout = useStore((store) => store.logout);

  return (
    <header className="border-border bg-background/80 backdrop-blur-2xl-md sticky top-0 z-100 w-full border-b">
      <div className="content flex h-16.25 items-center justify-between">
        <Link
          href="/"
          className="font-display me-5 inline shrink text-2xl font-bold md:text-nowrap"
          aria-label="Accueil"
        >
          Maison Lumière
        </Link>
        <nav className="w-full shrink">
          <ul className="flex items-center justify-end gap-2">
            <li className="me-auto">
              <Link href="/products" className="label flex px-3 py-2">
                Produits
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  className="label btn-outline flex flex-nowrap px-3! py-2"
                >
                  <MdOutlineVerifiedUser size="16px" /> Admin
                </Link>
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <button className="btn-outline px-3 py-2" onClick={logout}>
                  Déconnexion
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link className="label flex px-3 py-2" href="/users/login">
                    Se Connecter
                  </Link>
                </li>
                <li>
                  <Link className="label flex px-3 py-2" href="/users/signup">
                    Créer un compte
                  </Link>
                </li>
              </>
            )}

            <li>
              <CartButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
