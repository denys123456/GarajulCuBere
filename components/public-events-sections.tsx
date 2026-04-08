"use client";

import { useEffect, useMemo, useState } from "react";
import { EventCard } from "@/components/event-card";
import { Reveal } from "@/components/reveal";
import { isPastEvent } from "@/lib/event-utils";
import type { StoredEvent } from "@/lib/events-store";

export function PublicEventsSections({ initialEvents }: { initialEvents: StoredEvent[] }) {
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      const response = await fetch("/api/events", { cache: "no-store" });
      const data = await response.json().catch(() => null);

      if (!active || !response.ok) {
        return;
      }

      setEvents(data.events ?? []);
    }

    loadEvents();

    return () => {
      active = false;
    };
  }, []);

  const activeEvents = useMemo(() => events.filter((event) => !isPastEvent(event)), [events]);
  const pastEvents = useMemo(
    () => events.filter((event) => isPastEvent(event)).sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [events]
  );

  return (
    <>
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
              <EventCard key={event.id} event={{ ...event, date: new Date(event.date) }} />
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
              <EventCard key={event.id} event={{ ...event, date: new Date(event.date) }} />
            ))}
          </Reveal>
        )}
      </section>
    </>
  );
}
