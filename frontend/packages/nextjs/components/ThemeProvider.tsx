"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider 
      attribute="data-theme" 
      defaultTheme="light" 
      themes={["light", "dark"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};
