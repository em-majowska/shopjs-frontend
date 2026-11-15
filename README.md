# Maison Lumière — Frontend

Boutique en ligne réalisée avec Next.js 16, React 19, TypeScript et Tailwind CSS. Le frontend communique avec une API configurée par `API_BASE_URL`.

## Pages

| Route            | Contenu                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `/`              | Accueil et sélection de produits                                   |
| `/products`      | Catalogue, recherche de produits                                   |
| `/products/[id]` | Détail d’un produit                                                |
| `/cart`          | Panier local                                                       |
| `/payment`       | Adresse de livraison et validation de commande (connexion requise) |
| `/admin`         | Commandes, compteur et suivi des livraisons (accès administrateur) |
| `/users/login`   | Connexion                                                          |
| `/users/signup`  | Création de compte                                                 |

## Installation et lancement

Prérequis : Node.js et Yarn. Démarrer l’API avant le frontend.

```bash
yarn install
cp .env.example .env
yarn dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000). Adapter `.env` à l’adresse de l’API. Pour vérifier ou lancer en production :

```bash
yarn lint
yarn build
yarn start
```

# Maison Lumière — Frontend

Boutique en ligne réalisée avec Next.js 16, React 19, TypeScript et Tailwind CSS. Le frontend communique avec une API configurée par `API_BASE_URL`.

# Maison Lumière — Frontend

Boutique en ligne réalisée avec Next.js 16, React 19, TypeScript et Tailwind CSS. Le frontend communique avec une API configurée par `API_BASE_URL`.

## Pages

| Route            | Contenu                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `/`              | Accueil et sélection de produits                                   |
| `/products`      | Catalogue, recherche de produits                                   |
| `/products/[id]` | Détail d’un produit                                                |
| `/cart`          | Panier local                                                       |
| `/payment`       | Adresse de livraison et validation de commande (connexion requise) |
| `/admin`         | Commandes, compteur et suivi des livraisons (accès administrateur) |
| `/users/login`   | Connexion                                                          |
| `/users/signup`  | Création de compte                                                 |

## Installation et lancement

Prérequis : Node.js et Yarn. Démarrer l’API avant le frontend.

```bash
yarn install
cp .env.example .env
yarn dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000). Adapter `.env` à l’adresse de l’API. Pour vérifier ou lancer en production :

```bash
yarn lint
yarn build
yarn start
```

# Maison Lumière — Frontend

Boutique en ligne réalisée avec Next.js 16, React 19, TypeScript et Tailwind CSS. Le frontend communique avec une API configurée par `API_BASE_URL`.

## Pages

| Route            | Contenu                                                             |
| ---------------- | ------------------------------------------------------------------- |
| `/`              | Accueil et sélection de produits                                    |
| `/products`      | Catalogue, recherche de produits                                    |
| `/products/[id]` | Détail d’un produit                                                 |
| `/cart`          | Panier local                                                        |
| `/payment`       | Address de livraison et validation de commande (connection requise) |
| `/admin`         | Commandes, compteur et suivi des livraisons (accès administrateur)  |
| `/users/login`   | Connection                                                          |
| `/users/signup`  | Création de compte                                                  |

## Installation Et Lancement

Prérequis : Node.js et Yarn. Démarrer l’API avant le frontend.

## Pages

| Route            | Contenu                                                             |
| ---------------- | ------------------------------------------------------------------- |
| `/`              | Accueil et sélection de produits                                    |
| `/products`      | Catalogue, recherche de produits                                    |
| `/products/[id]` | Détail d’un produit                                                 |
| `/cart`          | Panier local                                                        |
| `/payment`       | Address de livraison et validation de commande (connection requise) |
| `/admin`         | Commandes, compteur et suivi des livraisons (accès administrateur)  |
| `/users/login`   | Connection                                                          |
| `/users/signup`  | Création de compte                                                  |

## Installation Et Lancement

Prérequis : Node.js et Yarn. Démarrer l’API avant le frontend.

```bash

yarn install
cp .env.example .env

yarn install
cp .env.example .env
yarn dev

```

Pour vérifier ou lancer en production :

```bash

yarn lint
yarn build
yarn start

```

## Variables d’environnement

| Variable                        | Rôle                                                       | Valeur par défaut       |
| ------------------------------- | ---------------------------------------------------------- | ----------------------- |
| `API_BASE_URL`                  | URL de base de l’API backend                               | `http://localhost:4000` |
| `NEXT_PUBLIC_API_TIMEOUT`       | Délai maximal des requêtes API, en millisecondes           | `10000`                 |
| `NEXT_PUBLIC_PUBLIC_CACHE_LIFE` | Revalidation des données publiques (produits), en secondes | `180`                   |
| `NEXT_PUBLIC_ADMIN_CACHE_LIFE`  | Revalidation des commandes, en secondes                    | `60`                    |

## Fonctionnalités Techniques

- **Cache et revalidation** — `searchData` et `fetchProduct` mettent en cache les données produits selon `NEXT_PUBLIC_PUBLIC_CACHE_LIFE`. `fetchOrders` utilise `NEXT_PUBLIC_ADMIN_CACHE_LIFE` et le tag `admin-orders`; l’action de livraison appelle `updateTag` pour invalider ce cache après modification.

- **Thème** — le thème est conservé dans le store persistent Zustand. `ThemeButton` applique la classe `dark` côté navigateur, sans lecture de cookie dans le layout serveur.

- **Proxy et accès** — `src/proxy.ts` s’exécute pour `/payment` et `/admin`. Il redirige vers la connection si le cookie `token` est absent; pour l’administration, il transmet aussi un message d’erreur si le cookie `isAdmin` est absent. Les helpers `src/middlewares/isAuthenticated.ts`, `isAdmin.ts` et `redirectToIfNotAuthenticated.ts` vérifient les cookies côté serveur. Les contrôles d’accès backend restent indispensables : la présence d’un cookie ne valid pas à elle seule les permissions.

- **Store Zustand** — un store rassemble les slices panier et utilisateur. `persist` conserve l’état dans `localStorage`. Les indicateurs d’authentification du store servent à l’interface; l’accès serveur s’appuie sur les cookies et l’API.

- **Hydratation** — `useHydrated` évite d’afficher un total de panier incorrect avant la restoration de l’état du navigateur.

- **Mise à jour optimiste et glisser-déposer** — sur `/admin`, `DragAndDrop` utilise `@hello-pangea/dnd` et React `useOptimistic` pour mettre à jour immédiatement l’affichage du statut des commandes; `handleDelivery` enregistre le changement auprès de l’API.

- **Server Actions** — les actions de connection, inscription, déconnexion, paiement et livraison s’exécutent côté serveur. Elles appellent l’API et gèrent les cookies d’authentification; les actions de paiement et de livraison utilisent le token pour leurs requêtes protégées.
