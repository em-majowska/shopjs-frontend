import PaymentSection from "@/components/PaymentSection";

const PaymentPage = async () => {
  return (
    <main className="main content">
      <p className="label text-rose-foreground">Dernière étape</p>
      <h1 className="font-display mb-10 text-4xl font-medium md:text-5xl">
        Paiement
      </h1>
      <PaymentSection />
    </main>
  );
};

export default PaymentPage;
