"use client";
import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import theme from "./theme";

import "@mantine/core/styles.css";
type MantineCustomProviderProps = {
  children: ReactNode;
};

export default function MantineCustomProvider({
  children,
}: MantineCustomProviderProps) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
