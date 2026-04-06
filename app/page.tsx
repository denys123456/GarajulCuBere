import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin, Sparkles } from "lucide-react";
import { ensureSeedData } from "@/lib/bootstrap";
import { prisma } from "@/lib/prisma";
import { businessInfo } from "@/lib/business-data";
import { menuCategories } from "@/lib/menu-data";
import { EventCard } from "@/components/event-card";

export default async function HomePage() {
  await ensureSeedData();
  const upcomingEvents = await prisma.event.findMany({
    take: 2,
    orderBy: { date: "asc" }
  });

  const featuredCategories = menuCategories.slice(0, 4);

  return (
    <div className="pb-24">
      <section className="section-shell grid gap-10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-glow sm:p-12">
          <div className="absolute inset-0 bg-noise opacity-90" />
          <div className="relative space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-champagne">
              <Sparkles className="h-4 w-4" />
              Premium Lounge Experience
            </div>
            <div className="space-y-4">
              <h1 className="font-display text-6xl leading-none text-white sm:text-7xl">
                Garajul
                <span className="block text-champagne">cu Bere</span>
              </h1>
              <p className="max-w-xl text-lg text-white/68">{businessInfo.tagline}</p>
              <p className="max-w-2xl text-base leading-8 text-white/55">{businessInfo.supportingLine}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-bronze px-6 py-3 text-sm font-semibold text-black"
              >
                Explore Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
              >
                Vezi Evenimente
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="premium-border glass-panel rounded-[2rem] p-6">
            <p className="section-kicker">Highlights</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {businessInfo.highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="premium-border glass-panel rounded-[2rem] p-6">
            <p className="section-kicker">Program</p>
            <div className="mt-4 space-y-3">
              {businessInfo.schedule.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/55">{row.label}</span>
                  <span className="text-champagne">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="premium-border glass-panel rounded-[2rem] p-6">
            <p className="section-kicker">Location</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/65">
                <MapPin className="h-4 w-4 text-amber" />
                {businessInfo.address}
              </div>
              <a
                href={businessInfo.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-amber/25 bg-amber/10 px-4 py-2 text-sm text-champagne"
              >
                Open Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Top Categories</p>
            <h2 className="section-title mt-3">Built for long nights</h2>
          </div>
          <Link href="/menu" className="text-sm text-champagne">
            Full Menu
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredCategories.map((category, index) => (
            <div
              key={category.title}
              className="premium-border glass-panel rounded-[2rem] p-6"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, rgba(212,164,93,0.08), rgba(255,255,255,0.04))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(139,101,49,0.08))"
              }}
            >
              <p className="font-display text-3xl text-white">{category.title}</p>
              <p className="mt-3 text-sm leading-7 text-white/55">
                {category.items.slice(0, 2).map((item) => item.name).join(" • ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Upcoming Events</p>
            <h2 className="section-title mt-3">Nights worth showing up for</h2>
          </div>
          <Link href="/events" className="text-sm text-champagne">
            View all
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="premium-border glass-panel rounded-[2rem] p-6 lg:col-span-2">
            <p className="section-kicker">Social Proof</p>
            <h2 className="mt-3 font-display text-4xl text-white">Designed for memorable nights, not quick visits</h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/58">
              Garajul cu Bere combină un ritm relaxat de lounge, cocktailuri echilibrate, bere rece și seri care se
              mută natural din conversație în dans.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="premium-border glass-panel rounded-[2rem] p-6">
              <CalendarDays className="h-5 w-5 text-amber" />
              <p className="mt-4 text-sm text-white/58">Evenimente cu acces pe bază de cont și bilete legate direct de utilizator.</p>
            </div>
            <div className="premium-border glass-panel rounded-[2rem] p-6">
              <Clock3 className="h-5 w-5 text-amber" />
              <p className="mt-4 text-sm text-white/58">Program clar, contact rapid și un traseu digital complet pentru vizitatori.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
