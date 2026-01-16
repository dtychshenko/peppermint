"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import type { ReactNode } from "react";

const theme = createTheme({
  primaryColor: "peppermint",
  white: "#fcfcfc",
  black: "#222222",
  autoContrast: true,
  fontFamily: '"Noto Sans", Arial, Helvetica, sans-serif',
  colors: {
    peppermint: [
      "#eefcf5",
      "#dbf5e5",
      "#b5ebcc",
      "#8ddeaf",
      "#66d292",
      "#44c676",
      "#1f8f4a", // Primary shade (6)
      "#167039",
      "#0e5028",
      "#063018",
    ],
    // Dark theme based on primary color (Deep Forest Green tints)
    dark: [
      "#C8D6CE", // 0
      "#A6BFB3", // 1
      "#85A396", // 2
      "#618072", // 3
      "#436354", // 4
      "#2C4A3C", // 5
      "#203B2F", // 6
      "#172E25", // 7 (Standard Dark component bg)
      "#10241C", // 8 (Standard Dark body bg)
      "#0A1712", // 9
    ],
  },
});

export function ClientMantineProvider({ children }: { children: ReactNode }) {
  return (
    <div suppressHydrationWarning>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </div>
  );
}
