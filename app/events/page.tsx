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

      <Reveal className="mx-auto mt-14 max-w-4xl">
        <div className="glass-panel rounded-[2rem] px-8 py-10">
          <p className="section-kicker">Evenimente trecute</p>
          <h2 className="mt-5 font-display text-5xl font-semibold tracking-[-0.04em] text-ink">Summer Events</h2>
          <div className="mt-8 space-y-4 text-base leading-8 text-ink/70">
            <p>Teren de Fotbal, Săbăoani (Neamț)</p>
            <p>Strada Progresului, Neamt</p>
            <p>sâmbătă, 24 august '24, ora 21:00 acces de la 20:00</p>
            <p>
              Pe 24 august 2024, te invităm să participi la prima ediție a evenimentului "Summer Memories" în
              Săbăoani! Organizat de Garajul cu Bere, alături de partenerii săi, acest festival în aer liber promite o
              seară memorabilă plină de muzică și distracție.
            </p>
            <p>
              Atmosfera va fi întreținută de DJ renumiți precum Nairam, Nicolle, Mutt & Dee, care vor asigura cele mai
              bune mixuri muzicale, perfecte pentru a crea amintiri de neuitat. La tarabe și tobe live, Chi Pah va
              electriza atmosfera, iar MC Anuryh va asigura buna dispoziție pe parcursul întregii seri.
            </p>
            <p>Vă așteptăm cu drag să celebrați vara la "Summer Memories", un eveniment care va avea loc anual.</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
