"use client";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import { TbSunMoon } from "react-icons/tb";

const ThemeButton = () => {
  const theme = useStore((store) => store.theme);
  const setTheme = useStore((store) => store.setTheme);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme();
  };

  return (
    <label htmlFor="theme-switcher" className="cursor-pointer p-2">
      <input
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
