"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="label text-muted-foreground hover:text-accent-foreground mb-10 flex items-center gap-2 transition-colors duration-300 ease-in-out hover:cursor-pointer"
      onClick={() => router.back()}
    >
      <IoIosArrowRoundBack className="size-5" /> Tous les produits
    </button>
  );
};

export default BackButton;
