import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="glass-panel rounded-[2rem] p-8">
        <p className="section-kicker">Plata finalizata</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-ink">Plata a fost trimisa catre verificare</h1>
        <p className="mt-4 text-sm leading-8 text-ink/62">
          Dupa confirmarea Stripe, biletul va aparea in contul tau. Poti verifica imediat in sectiunea My Tickets.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/account" className="cta-primary">
            Vezi contul
          </Link>
          <Link href="/events" className="cta-secondary">
            Inapoi la evenimente
          </Link>
        </div>
      </div>
    </div>
  );
}
