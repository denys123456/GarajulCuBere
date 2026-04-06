import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Phone, Sparkles } from "lucide-react";
import { ensureSeedData } from "@/lib/bootstrap";
import { businessInfo } from "@/lib/business-data";
import { Reveal } from "@/components/reveal";
import { getDrinkMenuCategories } from "@/lib/drinks-menu";

export default async function HomePage() {
  await ensureSeedData();

  const featuredCategories = (await getDrinkMenuCategories()).slice(0, 6);
  const mapsEmbedUrl =
    "https://www.google.com/maps?q=Strada+Luceaf%C4%83rului+617400+S%C4%83b%C4%83oani&z=15&output=embed";

  return (
    <div className="pb-24">
      <section className="section-shell py-8 lg:py-12">
        <div className="fade-in-up relative overflow-hidden rounded-[2.5rem] border border-[#e3d6c3] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(247,240,229,0.84)),radial-gradient(circle_at_top_left,rgba(183,139,71,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(143,106,54,0.12),transparent_24%)] px-7 py-12 shadow-glow sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute inset-0 bg-noise opacity-70" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e1d4c1] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.32em] text-amber">
                <Sparkles className="h-4 w-4" />
                Terasă Premium
              </div>
              <div className="space-y-5">
                <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-ink sm:text-6xl lg:text-7xl">
                  Garajul cu Bere
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-ink/70">{businessInfo.supportingLine}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/menu" className="cta-primary gap-2">
                  Vezi meniul
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="cta-secondary">
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex items-end">
              <div className="glass-panel w-full rounded-[1.75rem] p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={businessInfo.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-full bg-[#f5efe6] px-5 py-3 text-sm font-medium text-ink"
                  >
                    <Instagram className="h-4 w-4 text-amber" />
                    Instagram
                  </a>
                  <a
                    href={businessInfo.phoneHref}
                    className="flex items-center gap-3 rounded-full bg-[#f5efe6] px-5 py-3 text-sm font-medium text-ink"
                  >
                    <Phone className="h-4 w-4 text-amber" />
                    Telefon
                  </a>
                  <a
                    href={businessInfo.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-full bg-[#f5efe6] px-5 py-3 text-sm font-medium text-ink"
                  >
                    <Facebook className="h-4 w-4 text-amber" />
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal className="section-shell py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="section-kicker">Meniu</p>
            <h2 className="section-title">Alese frecvent</h2>
          </div>
          <Link href="/menu" className="text-sm font-semibold text-amber">
            Vezi meniul
          </Link>
        </div>
        <div className="section-divider mb-8" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredCategories.map((category, index) => (
            <div
              key={category.title}
              className="glass-panel rounded-[1.5rem] p-6"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(255,255,255,0.84), rgba(248,242,233,0.92))"
                    : "linear-gradient(180deg, rgba(250,245,238,0.9), rgba(255,255,255,0.8))"
              }}
            >
              <p className="font-display text-3xl font-semibold text-ink">{category.title}</p>
              <p className="mt-3 text-sm leading-7 text-ink/62">
                {category.items.slice(0, 3).map((item) => item.name).join(" • ")}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="section-shell py-10" delay={0.05}>
        <div className="grid gap-6">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="section-kicker">Evenimente</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">
              Nu există evenimente active
            </h2>
          </div>
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="section-kicker">Evenimente trecute</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Summer Events</h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-ink/70">
              <p>Teren de Fotbal, Săbăoani (Neamț)</p>
              <p>Strada Progresului, Neamt</p>
              <p>sâmbătă, 24 august '24, ora 21:00 acces de la 20:00</p>
              <p>
                Pe 24 august 2024, te invităm să participi la prima ediție a evenimentului "Summer Memories" în
                Săbăoani! Organizat de Garajul cu Bere, alături de partenerii săi, acest festival în aer liber promite o
                seară memorabilă plină de muzică și distracție.
              </p>
              <p>
                Atmosfera va fi întreținută de DJ renumiți precum Nairam, Nicolle, Mutt & Dee, care vor asigura cele
                mai bune mixuri muzicale, perfecte pentru a crea amintiri de neuitat. La tarabe și tobe live, Chi Pah
                va electriza atmosfera, iar MC Anuryh va asigura buna dispoziție pe parcursul întregii seri.
              </p>
              <p>Vă așteptăm cu drag să celebrați vara la "Summer Memories", un eveniment care va avea loc anual.</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section-shell py-10" delay={0.08}>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="section-kicker">Contact</p>
            <div className="mt-4 space-y-6">
              <div>
                <p className="text-sm text-ink/45">Telefon</p>
                <a href={businessInfo.phoneHref} className="mt-1 block text-lg text-ink">
                  {businessInfo.phone}
                </a>
              </div>
              <div>
                <p className="text-sm text-ink/45">Locație</p>
                <p className="mt-1 text-lg text-ink">{businessInfo.address}</p>
              </div>
            </div>
            <a href={businessInfo.mapsUrl} target="_blank" rel="noreferrer" className="cta-secondary mt-8">
              Deschide Google Maps
            </a>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#e3d6c3] bg-white shadow-panel">
            <iframe
              title="Hartă Garajul cu Bere"
              src={mapsEmbedUrl}
              className="h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
