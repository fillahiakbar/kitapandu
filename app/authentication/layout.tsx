"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { authTheme } from "@/utils/theme/authTheme";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={authTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
