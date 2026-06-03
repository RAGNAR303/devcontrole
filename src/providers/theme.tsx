"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { string } from "zod";

type Theme = "light" | "dark"; // limita as opçoes

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const themeStorage = localStorage.getItem("theme") as Theme;

    if (themeStorage) {
      setTheme(themeStorage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");

    document.documentElement.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
