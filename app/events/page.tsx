import { ensureSeedData } from "@/lib/bootstrap";
import { getStoredEvents } from "@/lib/events-store";
import { PublicEventsSections } from "@/components/public-events-sections";

export default async function EventsPage() {
  await ensureSeedData();
  const events = await getStoredEvents();

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="page-intro">
        <p className="section-kicker">Evenimente</p>
        <h1 className="section-title">Calendarul Garajul cu Bere</h1>
      </div>
      <PublicEventsSections initialEvents={events} />
    </div>
  );
}
