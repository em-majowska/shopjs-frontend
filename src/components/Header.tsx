"use client";
import { useStore } from "@/store/store";
import Link from "next/link";
import { MdOutlineVerifiedUser } from "react-icons/md";
import CartButton from "./CartButton";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import ThemeButton from "./ThemeButton";

const Header = () => {
  const isAuthenticated = useStore((store) => store.isAuthenticated);
  const isAdmin = useStore((store) => store.isAdmin);
  const logout = useStore((store) => store.logout);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="border-border bg-background/80 sticky top-0 z-100 w-full border-b backdrop-blur-md">
      <div className="content flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display me-5 inline shrink text-2xl font-bold whitespace-nowrap"
          aria-label="Accueil"
          onClick={closeMenu}
        >
          Maison Lumière
        </Link>
        <ThemeButton />

        <nav className="hidden w-full items-center justify-end md:flex">
          <ul className="flex items-center gap-2">
            <li className="me-auto">
              <Link
                onClick={closeMenu}
                href="/products"
                className="label flex px-3 py-2"
              >
                Produits
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  onClick={closeMenu}
                  className="label btn-outline flex items-center gap-1.5 px-3! py-2"
                >
                  <MdOutlineVerifiedUser size="16px" /> Admin
                </Link>
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <button
                  className="btn-outline cursor-pointer px-3 py-2"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Déconnexion
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    onClick={closeMenu}
                    className="label flex px-3 py-2"
                    href="/users/login"
                  >
                    Se Connecter
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={closeMenu}
                    className="label flex px-3 py-2"
                    href="/users/signup"
                  >
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

        <div className="flex items-center gap-3 md:hidden">
          <CartButton closeMenu={closeMenu} />
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            className="text-foreground p-2 focus:outline-none"
          >
            {isOpen ? (
              <HiOutlineX className="size-6" />
            ) : (
              <HiOutlineMenu className="size-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`bg-background border-border fixed inset-x-0 top-16 z-50 flex flex-col gap-4 border-b p-6 transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2">
          <Link
            href="/products"
            className="label border-border/50 flex border-b py-3 text-lg"
            onClick={closeMenu}
          >
            Produits
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="label btn-outline flex items-center justify-center gap-2 py-3 text-lg"
              onClick={closeMenu}
            >
              <MdOutlineVerifiedUser size="18px" /> Administration
            </Link>
          )}
          {isAuthenticated ? (
            <button
              className="btn-outline mt-2 w-full cursor-pointer py-3 text-center text-lg"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Déconnexion
            </button>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                className="label border-border flex justify-center rounded-xl border py-3 text-lg"
                href="/users/login"
                onClick={closeMenu}
              >
                Se Connecter
              </Link>
              <Link
                className="btn-primary flex justify-center py-3 text-lg"
                href="/users/signup"
                onClick={closeMenu}
              >
                Créer un compte
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
