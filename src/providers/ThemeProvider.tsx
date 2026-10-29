"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const STORAGE_KEY = "theme";
const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
});

const getResolvedTheme = (theme: Theme): ResolvedTheme => {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return theme;
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] =
    useState<ResolvedTheme>(defaultTheme === "light" ? "light" : "dark");

  const applyTheme = useCallback(
    (nextTheme: Theme) => {
      const resolved = getResolvedTheme(nextTheme);
      const root = document.documentElement;
      let transitionStyle: HTMLStyleElement | undefined;

      if (disableTransitionOnChange) {
        transitionStyle = document.createElement("style");
        transitionStyle.textContent =
          "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
        document.head.appendChild(transitionStyle);
      }

      root.classList.remove("light", "dark");
      root.classList.add(resolved);
      root.style.colorScheme = resolved;
      setResolvedTheme(resolved);

      if (transitionStyle) {
        window.getComputedStyle(document.body);
        window.setTimeout(() => transitionStyle?.remove(), 1);
      }
    },
    [disableTransitionOnChange],
  );

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      if (nextTheme === "system" && !enableSystem) return;

      setThemeState(nextTheme);
      try {
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch {
        // Theme changes still apply when browser storage is unavailable.
      }
      applyTheme(nextTheme);
    },
    [applyTheme, enableSystem],
  );

  useEffect(() => {
    let initialTheme = defaultTheme;
    try {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);
      if (
        storedTheme === "light" ||
        storedTheme === "dark" ||
        (storedTheme === "system" && enableSystem)
      ) {
        initialTheme = storedTheme;
      }
    } catch {
      // Use the configured default when browser storage is unavailable.
    }

    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, [applyTheme, defaultTheme, enableSystem]);

  useEffect(() => {
    if (!enableSystem || theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [applyTheme, enableSystem, theme]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;

      const nextTheme =
        event.newValue === "light" ||
        event.newValue === "dark" ||
        (event.newValue === "system" && enableSystem)
          ? event.newValue
          : defaultTheme;

      setThemeState(nextTheme);
      applyTheme(nextTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [applyTheme, defaultTheme, enableSystem]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
