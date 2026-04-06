"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" }
];

type SiteHeaderProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

export function SiteHeader({ isLoggedIn, isAdmin }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="premium-border rounded-2xl bg-gradient-to-br from-amber/25 to-transparent p-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber to-bronze" />
          </div>
          <div>
            <p className="font-display text-2xl tracking-[0.12em] text-champagne">Garajul cu Bere</p>
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">Premium Pub Platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition",
                  active
                    ? "bg-amber/15 text-champagne"
                    : "text-white/72 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAdmin && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-amber/35 bg-amber/10 px-4 py-2 text-sm text-champagne"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
          <Link
            href={isLoggedIn ? "/account" : "/login"}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
          >
            <User className="h-4 w-4" />
            {isLoggedIn ? "Account" : "Login"}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/85 lg:hidden">
          <div className="section-shell flex flex-col gap-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm transition",
                  pathname === item.href
                    ? "bg-amber/15 text-champagne"
                    : "bg-white/5 text-white/75"
                )}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-amber/10 px-4 py-3 text-sm text-champagne"
              >
                Admin Panel
              </Link>
            )}
            <Link
              href={isLoggedIn ? "/account" : "/login"}
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/90"
            >
              {isLoggedIn ? "Account" : "Login / Register"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
