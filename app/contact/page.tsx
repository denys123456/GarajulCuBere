import { Clock3, Instagram, MapPin, Phone, ExternalLink } from "lucide-react";
import { businessInfo } from "@/lib/business-data";

export default function ContactPage() {
  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <p className="section-kicker">Contact</p>
        <h1 className="section-title">Everything needed before you walk in</h1>
        <p className="text-sm leading-8 text-white/60">
          Contact rapid, hartă externă, program clar și acces direct către canalele sociale ale locației.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.92fr]">
        <div className="premium-border glass-panel rounded-[2rem] p-8">
          <div className="grid gap-6">
            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 text-amber" />
              <div>
                <p className="text-sm text-white/45">Telefon</p>
                <a href={businessInfo.phoneHref} className="mt-1 block text-lg text-white">
                  {businessInfo.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 text-amber" />
              <div>
                <p className="text-sm text-white/45">Adresă</p>
                <p className="mt-1 text-lg text-white">{businessInfo.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock3 className="mt-1 h-5 w-5 text-amber" />
              <div>
                <p className="text-sm text-white/45">Program</p>
                <div className="mt-2 space-y-2 text-sm text-white/70">
                  {businessInfo.schedule.map((item) => (
                    <div key={item.label} className="flex justify-between gap-6">
                      <span>{item.label}</span>
                      <span className="text-champagne">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Instagram className="mt-1 h-5 w-5 text-amber" />
              <div className="space-y-2 text-sm">
                <a href={businessInfo.instagram} target="_blank" rel="noreferrer" className="block text-white">
                  Instagram
                </a>
                <a href={businessInfo.facebook} target="_blank" rel="noreferrer" className="block text-white">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={businessInfo.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber to-bronze px-5 py-3 text-sm font-semibold text-black"
            >
              Sună acum
            </a>
            <a
              href={businessInfo.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm"
            >
              Deschide harta
            </a>
            <a
              href={businessInfo.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm"
            >
              Vezi Instagram
            </a>
          </div>
        </div>

        <a
          href={businessInfo.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="premium-border glass-panel group block rounded-[2rem] p-4"
        >
          <div className="flex h-full min-h-[440px] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(212,164,93,0.24),transparent_22%),radial-gradient(circle_at_80%_72%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(180deg,#121212,#090909)] p-8">
            <div>
              <p className="section-kicker">Map Card</p>
              <h2 className="mt-4 font-display text-5xl text-white">Open in Google Maps</h2>
            </div>
            <div className="space-y-4">
              <p className="max-w-sm text-sm leading-7 text-white/60">{businessInfo.location}</p>
              <div className="inline-flex items-center gap-2 text-champagne">
                Open external map
                <ExternalLink className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
