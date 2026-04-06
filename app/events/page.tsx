import { EventCard } from "@/components/event-card";
import { ensureSeedData } from "@/lib/bootstrap";
import { prisma } from "@/lib/prisma";

export default async function EventsPage() {
  await ensureSeedData();
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" }
  });

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="max-w-3xl space-y-4">
        <p className="section-kicker">Events</p>
        <h1 className="section-title">Curated nights with account-based access</h1>
        <p className="text-sm leading-8 text-white/60">
          Rezervarea biletelor se face doar din contul tău. Fiecare acces rămâne salvat în dashboard, împreună cu
          detaliile cumpărătorului și codul de ticket.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
