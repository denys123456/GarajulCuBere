import { Clock3, Instagram, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { businessInfo } from "@/lib/business-data";

export default function ContactPage() {
  const mapsEmbedUrl =
    "https://www.google.com/maps?q=Strada+Luceaf%C4%83rului+617400+S%C4%83b%C4%83oani&z=15&output=embed";

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="page-intro">
        <p className="section-kicker">Contact</p>
        <h1 className="section-title">Everything essential, presented with restraint</h1>
        <p className="text-base leading-8 text-ink/68">
          Clear contact details, opening hours, and a clean embedded map that matches the rest of the interface.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.92fr]">
        <Reveal>
          <div className="glass-panel rounded-[2rem] p-8">
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 text-amber" />
                <div>
                  <p className="text-sm text-ink/45">Telefon</p>
                  <a href={businessInfo.phoneHref} className="mt-1 block text-lg text-ink">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 text-amber" />
                <div>
                  <p className="text-sm text-ink/45">Adresă</p>
                  <p className="mt-1 text-lg text-ink">{businessInfo.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock3 className="mt-1 h-5 w-5 text-amber" />
                <div>
                  <p className="text-sm text-ink/45">Program</p>
                  <div className="mt-2 space-y-2 text-sm text-ink/70">
                    {businessInfo.schedule.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between gap-6 border-b border-[#eadfce] pb-2 last:border-b-0 last:pb-0"
                      >
                        <span>{item.label}</span>
                        <span className="font-semibold text-ink">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Instagram className="mt-1 h-5 w-5 text-amber" />
                <div className="space-y-2 text-sm">
                  <a href={businessInfo.instagram} target="_blank" rel="noreferrer" className="block text-ink">
                    Instagram
                  </a>
                  <a href={businessInfo.facebook} target="_blank" rel="noreferrer" className="block text-ink">
                    Facebook
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={businessInfo.phoneHref} className="cta-primary">
                Sună acum
              </a>
              <a href={businessInfo.mapsUrl} target="_blank" rel="noreferrer" className="cta-secondary">
                Deschide harta
              </a>
              <a href={businessInfo.instagram} target="_blank" rel="noreferrer" className="cta-secondary">
                Vezi Instagram
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="overflow-hidden rounded-[2rem] border border-[#e3d6c3] bg-white p-3 shadow-panel">
            <iframe
              title="Garajul cu Bere map"
              src={mapsEmbedUrl}
              className="h-[420px] w-full rounded-[1.4rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
