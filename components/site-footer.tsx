import Link from "next/link";
import { businessInfo } from "@/lib/business-data";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#e7dac8] bg-[#f4efe7]/80">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-semibold text-ink">Garajul cu Bere</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-ink/65">{businessInfo.supportingLine}</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber">Locație</p>
          <p className="mt-3 text-sm text-ink/70">{businessInfo.address}</p>
          <p className="mt-2 text-sm text-ink/70">{businessInfo.location}</p>
          <a href={businessInfo.phoneHref} className="mt-2 block text-sm text-amber">
            {businessInfo.phone}
          </a>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber">Navigare</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink/72">
            <Link href="/menu">Meniu</Link>
            <Link href="/events">Evenimente</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <a href={businessInfo.instagram} target="_blank" rel="noreferrer" className="text-amber">
              Instagram
            </a>
            <a href={businessInfo.facebook} target="_blank" rel="noreferrer" className="text-amber">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
