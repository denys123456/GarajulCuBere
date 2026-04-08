import { ensureSeedData } from "@/lib/bootstrap";
import { isPastEvent } from "@/lib/event-utils";
import { SelectedEventRecord, safeEventSelect, withEventDefaults } from "@/lib/event-records";
import { prisma } from "@/lib/prisma";
import { EventCard } from "@/components/event-card";
import { Reveal } from "@/components/reveal";

export default async function EventsPage() {
  await ensureSeedData();

  let events: SelectedEventRecord[] = [];

  try {
    events = await prisma.event.findMany({
      select: safeEventSelect,
      orderBy: {
        date: "asc"
      }
    });
  } catch (error) {
    console.error("EventsPage data load failed", error);
  }

  const normalizedEvents = events.map(withEventDefaults);

  const activeEvents = normalizedEvents.filter((event) => !isPastEvent(event));
  const pastEvents = normalizedEvents.filter((event) => isPastEvent(event)).sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="page-intro">
        <p className="section-kicker">Evenimente</p>
        <h1 className="section-title">Calendarul Garajul cu Bere</h1>
      </div>

      <section className="mt-12">
        <div className="mb-8">
          <p className="section-kicker">Evenimente active</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Urmatoarele evenimente</h2>
        </div>

        {activeEvents.length === 0 ? (
          <div className="rounded-[1.75rem] border border-[#e4d8c8] bg-[#fffaf2] px-6 py-8 text-base text-ink/68 shadow-[0_18px_40px_rgba(67,46,21,0.08)]">
            Nu exista evenimente active
          </div>
        ) : (
          <Reveal className="grid gap-6 lg:grid-cols-2">
            {activeEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Reveal>
        )}
      </section>

      <section className="mt-16">
        <div className="mb-8">
          <p className="section-kicker">Evenimente trecute</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Arhiva de evenimente</h2>
        </div>

        {pastEvents.length > 0 && (
          <Reveal className="grid gap-6 lg:grid-cols-2">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Reveal>
        )}
      </section>
    </div>
  );
}
