import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type SiteShellProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  children: ReactNode;
};

export function SiteShell({ isLoggedIn, isAdmin, children }: SiteShellProps) {
  return (
    <div className="min-h-screen">
      <SiteHeader isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
