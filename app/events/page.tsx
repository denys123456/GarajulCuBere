import { Clock3, MapPin } from "lucide-react";
import { ensureSeedData } from "@/lib/bootstrap";
import { Reveal } from "@/components/reveal";

export default async function EventsPage() {
  await ensureSeedData();

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="page-intro">
        <p className="section-kicker">Evenimente</p>
        <h1 className="section-title">Nu există evenimente active</h1>
      </div>

      <Reveal className="mx-auto mt-14 max-w-5xl">
        <div className="rounded-[1.5rem] border border-[#e4d8c8] bg-[#fffaf2] p-7 shadow-[0_18px_40px_rgba(67,46,21,0.08)] sm:p-8 lg:p-10">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
            Summer Events
          </h2>

          <div className="mt-8 max-w-[700px] space-y-5 text-base leading-9 text-ink/74">
            <p>
              Pe <strong>24 august 2024</strong>, te invităm să participi la prima ediție a evenimentului{" "}
              <strong>"Summer Memories"</strong> în <strong>Săbăoani</strong>!
            </p>
            <p>
              Organizat de Garajul cu Bere, alături de partenerii săi, acest festival în aer liber promite o seară
              memorabilă plină de muzică și distracție.
            </p>
            <p>Atmosfera va fi întreținută de DJ renumiți precum Nairam, Nicolle, Mutt & Dee.</p>
            <p>La tarabe și tobe live, Chi Pah va electriza atmosfera, iar MC Anuryh va asigura buna dispoziție.</p>
            <p>Vă așteptăm cu drag să celebrați vara!</p>
          </div>

          <div className="mt-8 rounded-[1.25rem] border border-[#eadfce] bg-white/80 p-5 sm:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-[1rem] bg-[#fcf7ef] p-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber" />
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-[0.18em] text-amber/80">Locație</p>
                  <p className="text-base leading-7 text-ink">
                    <strong>Teren de Fotbal, Săbăoani (Neamț)</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-[1rem] bg-[#fcf7ef] p-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber" />
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-[0.18em] text-amber/80">Adresă</p>
                  <p className="text-base leading-7 text-ink">
                    Strada Progresului, <strong>Neamț</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-[1rem] bg-[#fcf7ef] p-4 md:col-span-2">
                <Clock3 className="mt-1 h-5 w-5 shrink-0 text-amber" />
                <div className="space-y-1">
                  <p className="text-sm uppercase tracking-[0.18em] text-amber/80">Program</p>
                  <p className="text-base leading-7 text-ink">
                    <strong>sâmbătă, 24 august '24</strong>
                  </p>
                  <p className="text-base leading-7 text-ink">ora 21:00 (acces de la 20:00)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
