import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

type Theme = "light" | "dark";

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-full bg-surface-800 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`border-2 border-surface-800 group hover:bg-surface-200 transition-all duration-200 p-2 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-surface-500 focus:ring-offset-1 focus:ring-offset-transparent ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun className="size-5 stroke-surface-500 group-hover:stroke-surface-900 transition-colors duration-200" />
      ) : (
        <Moon className="size-5 stroke-surface-500 group-hover:stroke-surface-900 transition-colors duration-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
