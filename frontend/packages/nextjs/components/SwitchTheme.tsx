"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    if (isDarkMode) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex space-x-2 h-8 items-center justify-center text-sm ${className}`}>
        <div className="toggle bg-base-300 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className={`flex space-x-2 h-8 items-center justify-center text-sm ${className}`}>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          onChange={handleToggle}
          checked={isDarkMode}
        />
        <SunIcon className="swap-off h-5 w-5 fill-current" />
        <MoonIcon className="swap-on h-5 w-5 fill-current" />
      </label>
    </div>
  );
};
