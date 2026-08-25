import redirectToIfNotAuthenticated from "@/middlewares/redirectToIfNotAuthenticated";
import { PiPackageLight } from "react-icons/pi";

const AdminPage = async () => {
  await redirectToIfNotAuthenticated("/");

  return (
    <main className="main content">
      <div className="mb-20 flex items-end justify-between">
        <div>
          <p className="label text-rose-foreground">Administration</p>
          <h1 className="font-display text-4xl font-medium md:text-5xl">
            Commandes
          </h1>
        </div>
        <p>
          <span className="font-medium">0</span>
          <span className="text-muteed-foreground"> en cours · </span>
          <span className="font-medium">0</span>
          <span className="text-muteed-foreground"> au total</span>
        </p>
      </div>
      <section className="flex items-center justify-center">
        <div className="bg-card border-border mx-auto flex flex-col items-center justify-center gap-6 rounded-2xl border p-15">
          <PiPackageLight className="text-rose-foreground size-10" />
          <p className="font-display text-2xl font-medium">
            Aucune commande pour le moment
          </p>
          <p className="text-muted-foreground">
            Les commandes passées sur la boutique apparaîtront ici.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
