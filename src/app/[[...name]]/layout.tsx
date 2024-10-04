import type { Metadata } from "next";

import { MantineCustomProvider } from "@/Providers";
import { ColorSchemeScript } from "@mantine/core";
import { lexend } from "@/fonts/config";
import { StoreProvider } from "@/Providers/StoreProvider";
import { Layout } from "@/components";

export const metadata: Metadata = {
  title: "File System",
  description: "File System Manger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${lexend.className} ${lexend.className}`}>
        <MantineCustomProvider>
          <StoreProvider>
            <Layout>{children}</Layout>
          </StoreProvider>
        </MantineCustomProvider>
      </body>
    </html>
  );
}
