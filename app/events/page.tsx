import { ensureSeedData } from "@/lib/bootstrap";
import { Reveal } from "@/components/reveal";

export default async function EventsPage() {
  await ensureSeedData();

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="page-intro">
        <p className="section-kicker">Events</p>
        <h1 className="section-title">A quieter, more premium events presentation</h1>
        <p className="text-base leading-8 text-ink/68">
          A minimal status block keeps the page clean while preserving the existing events area in the site structure.
        </p>
      </div>

      <Reveal className="mx-auto mt-14 max-w-3xl">
        <div className="glass-panel rounded-[2rem] px-8 py-14 text-center">
          <p className="section-kicker">Past Events</p>
          <h2 className="mt-5 font-display text-5xl font-semibold tracking-[-0.04em] text-ink">Summer Events</h2>
          <p className="mt-5 text-lg text-ink/66">No active events</p>
        </div>
      </Reveal>
    </div>
  );
}
