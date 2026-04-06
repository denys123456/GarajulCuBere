import Link from "next/link";
import { businessInfo } from "@/lib/business-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="section-shell grid gap-10 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-champagne">Garajul cu Bere</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/60">{businessInfo.supportingLine}</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber/70">Visit</p>
          <p className="mt-3 text-sm text-white/70">{businessInfo.address}</p>
          <p className="mt-2 text-sm text-white/70">{businessInfo.location}</p>
          <a href={businessInfo.phoneHref} className="mt-2 block text-sm text-champagne">
            {businessInfo.phone}
          </a>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber/70">Explore</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/70">
            <Link href="/menu">Menu</Link>
            <Link href="/events">Events</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <a href={businessInfo.instagram} target="_blank" rel="noreferrer" className="text-champagne">
              Instagram
            </a>
            <a href={businessInfo.facebook} target="_blank" rel="noreferrer" className="text-champagne">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
