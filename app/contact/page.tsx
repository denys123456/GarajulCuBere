import { MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { businessInfo } from "@/lib/business-data";

export default function ContactPage() {
  const mapsEmbedUrl =
    "https://www.google.com/maps?q=Strada+Luceaf%C4%83rului+617400+S%C4%83b%C4%83oani&z=15&output=embed";

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="page-intro">
        <p className="section-kicker">Contact</p>
        <h1 className="section-title">Contact</h1>
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
                  <p className="text-sm text-ink/45">Locație</p>
                  <p className="mt-1 text-lg text-ink">{businessInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="overflow-hidden rounded-[2rem] border border-[#e3d6c3] bg-white p-3 shadow-panel">
            <iframe
              title="Hartă Garajul cu Bere"
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
