import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="glass-panel rounded-[2rem] p-8">
        <p className="section-kicker">Plata anulata</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-ink">Checkout-ul Stripe a fost anulat</h1>
        <p className="mt-4 text-sm leading-8 text-ink/62">
          Nu a fost creat niciun bilet. Poti reveni oricand pentru a relua plata.
        </p>
        <div className="mt-8">
          <Link href="/events" className="cta-primary">
            Inapoi la evenimente
          </Link>
        </div>
      </div>
    </div>
  );
}
