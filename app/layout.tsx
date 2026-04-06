import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getSession } from "@/lib/auth";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Garajul cu Bere",
  description: "Premium digital platform pentru Garajul cu Bere."
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const session = await getSession();

  return (
    <html lang="ro">
      <body>
        <SiteShell isLoggedIn={Boolean(session)} isAdmin={session?.role === "ADMIN"}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
