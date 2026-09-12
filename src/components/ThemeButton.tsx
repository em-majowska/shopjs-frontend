"use client";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { TbSunMoon } from "react-icons/tb";

const ThemeButton = () => {
  const router = useRouter();
  const themeSwitchRef = useRef<HTMLInputElement>(null);
  const theme = useStore((store) => store.theme);
  const setTheme = useStore((store) => store.setTheme);

  const toggleTheme = () => {
    setTheme();
    router.refresh();
  };

  return (
    <label htmlFor="theme-switcher" className="cursor-pointer p-2">
      <input
        ref={themeSwitchRef}
        type="checkbox"
        id="theme-switcher"
        className="absolute opacity-0"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <TbSunMoon size={25} />
    </label>
  );
};

export default ThemeButton;
