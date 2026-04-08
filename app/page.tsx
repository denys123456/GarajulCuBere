import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Phone, Sparkles } from "lucide-react";
import { ensureSeedData } from "@/lib/bootstrap";
import { businessInfo } from "@/lib/business-data";
import { getDrinkMenuCategories } from "@/lib/drinks-menu";
import { isPastEvent } from "@/lib/event-utils";
import { prisma } from "@/lib/prisma";
import { EventCard } from "@/components/event-card";
import { Reveal } from "@/components/reveal";

export default async function HomePage() {
  await ensureSeedData();

  const [featuredCategories, events] = await Promise.all([
    getDrinkMenuCategories().then((categories) => categories.slice(0, 6)),
    prisma.event.findMany({
      orderBy: {
        date: "asc"
      }
    })
  ]);

  const activeEvents = events.filter((event) => !isPastEvent(event));
  const pastEvents = events.filter((event) => isPastEvent(event)).sort((a, b) => +new Date(b.date) - +new Date(a.date));
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
                Terasa Premium
              </div>
              <div className="space-y-5">
                <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-ink sm:text-6xl lg:text-7xl">
                  Garajul cu Bere
                </h1>
                <p className="max-w-2xl text-lg leading-9 text-ink/70">{businessInfo.supportingLine}</p>
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
              <div className="glass-panel w-full rounded-[1.75rem] p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                  <a
                    href={businessInfo.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[62px] items-center justify-center gap-3 rounded-full border border-[#eadfce] bg-[#fcf7ef] px-4 py-3 text-center text-sm font-medium text-ink transition hover:bg-white"
                  >
                    <Instagram className="h-4 w-4 shrink-0 text-amber" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={businessInfo.phoneHref}
                    className="flex min-h-[62px] items-center justify-center gap-3 rounded-full border border-[#eadfce] bg-[#fcf7ef] px-4 py-3 text-center text-sm font-medium text-ink transition hover:bg-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-amber" />
                    <span>Telefon</span>
                  </a>
                  <a
                    href={businessInfo.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 flex min-h-[62px] items-center justify-center gap-3 rounded-full border border-[#eadfce] bg-[#fcf7ef] px-4 py-3 text-center text-sm font-medium text-ink transition hover:bg-white lg:col-span-1"
                  >
                    <Facebook className="h-4 w-4 shrink-0 text-amber" />
                    <span>Facebook</span>
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
          <div className="glass-panel rounded-[1.5rem] p-8">
            <p className="section-kicker">Evenimente</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Evenimente active</h2>
            {activeEvents.length === 0 ? (
              <p className="mt-4 text-base leading-8 text-ink/68">Nu exista evenimente active</p>
            ) : (
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {activeEvents.slice(0, 2).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[1.5rem] border border-[#e4d8c8] bg-[#fffaf2] p-7 shadow-[0_18px_40px_rgba(67,46,21,0.08)] sm:p-8 lg:p-10">
            <p className="section-kicker">Evenimente trecute</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Ultimele evenimente</h2>
            {pastEvents.length > 0 && (
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {pastEvents.slice(0, 2).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
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
                <p className="text-sm text-ink/45">Locatie</p>
                <p className="mt-1 text-lg text-ink">{businessInfo.address}</p>
              </div>
            </div>
            <a href={businessInfo.mapsUrl} target="_blank" rel="noreferrer" className="cta-secondary mt-8">
              Deschide Google Maps
            </a>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#e3d6c3] bg-white shadow-panel">
            <iframe
              title="Harta Garajul cu Bere"
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
