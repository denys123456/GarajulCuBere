"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield, User, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
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
    <header className="sticky top-0 z-50 border-b border-[#e6d8c4] bg-[#f8f6f2]/88 backdrop-blur-2xl shadow-[0_10px_30px_rgba(67,46,21,0.06)]">
      <div className="section-shell flex h-24 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-4">
          <div className="premium-border rounded-[2rem] bg-white/90 p-2 shadow-[0_18px_30px_rgba(67,46,21,0.08)]">
            <BrandLogo size="lg" />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">Garajul cu Bere</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-amber">Premium Bar Experience</p>
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
                  "rounded-full px-5 py-2.5 text-sm font-medium transition duration-300",
                  active
                    ? "bg-ink text-white shadow-[0_12px_24px_rgba(47,36,28,0.14)]"
                    : "text-ink/72 hover:bg-white hover:text-ink"
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
              className="inline-flex items-center gap-2 rounded-full border border-[#dec8a7] bg-[#fbf5eb] px-4 py-2.5 text-sm font-medium text-amber"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
          <Link
            href={isLoggedIn ? "/account" : "/login"}
            className="inline-flex items-center gap-2 rounded-full border border-[#d9cbb8] bg-white/80 px-4 py-2.5 text-sm font-medium text-ink transition duration-300 hover:bg-white"
          >
            <User className="h-4 w-4" />
            {isLoggedIn ? "Account" : "Login"}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d9cbb8] bg-white/80 text-ink lg:hidden"
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#e6d8c4] bg-[#fbf8f3]/95 lg:hidden">
          <div className="section-shell flex flex-col gap-2 py-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium transition",
                  pathname === item.href
                    ? "bg-ink text-white"
                    : "bg-white text-ink/78"
                )}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-[#fbf5eb] px-4 py-3 text-sm font-medium text-amber"
              >
                Admin Panel
              </Link>
            )}
            <Link
              href={isLoggedIn ? "/account" : "/login"}
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-ink"
            >
              {isLoggedIn ? "Account" : "Login / Register"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
