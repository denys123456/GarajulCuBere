import Link from "next/link";
import { ArrowRight, Clock3, MapPin, Sparkles } from "lucide-react";
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
                Premium bar experience
              </div>
              <div className="space-y-5">
                <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-ink sm:text-6xl lg:text-7xl">
                  A premium destination for cocktails, coffee, and long evenings.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-ink/70">{businessInfo.supportingLine}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/menu" className="cta-primary gap-2">
                  View Menu
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="cta-secondary">
                  Contact
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="glass-panel rounded-[1.75rem] p-6">
                <p className="section-kicker">Highlights</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {businessInfo.highlights.map((item) => (
                    <span key={item} className="rounded-full bg-[#f5efe6] px-4 py-2 text-sm font-medium text-ink/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="glass-panel rounded-[1.75rem] p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-amber" />
                  <div className="space-y-2">
                    <p className="section-kicker">Location</p>
                    <p className="text-sm leading-7 text-ink/72">{businessInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal className="section-shell py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="section-kicker">Curated Menu</p>
            <h2 className="section-title">Signature categories, presented with clarity</h2>
          </div>
          <Link href="/menu" className="text-sm font-semibold text-amber">
            Full menu
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
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="section-kicker">Past Events</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Summer Events</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-ink/68">No active events</p>
          </div>
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="section-kicker">Hours</p>
            <div className="mt-5 space-y-4">
              {businessInfo.schedule.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 border-b border-[#eadfce] pb-4 text-sm last:border-b-0 last:pb-0"
                >
                  <span className="text-ink/64">{row.label}</span>
                  <span className="font-semibold text-ink">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-ink/66">
              <Clock3 className="h-4 w-4 text-amber" />
              Designed for relaxed evenings and a clean guest journey.
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section-shell py-10" delay={0.08}>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="section-kicker">Visit</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">
              Easy to find, effortless to revisit
            </h2>
            <p className="mt-4 text-base leading-8 text-ink/68">{businessInfo.location}</p>
            <a href={businessInfo.mapsUrl} target="_blank" rel="noreferrer" className="cta-secondary mt-8">
              Open Google Maps
            </a>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#e3d6c3] bg-white shadow-panel">
            <iframe
              title="Garajul cu Bere map"
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
