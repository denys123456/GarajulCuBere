import Image from "next/image";
import Link from "next/link";
import { Clock3, Ticket, CalendarDays } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

type EventCardProps = {
  event: {
    slug: string;
    title: string;
    image: string;
    description: string;
    price: number;
    date: Date;
    duration: string;
    startHour: string;
  };
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="premium-border glass-panel overflow-hidden rounded-[2rem]">
      <div className="relative h-64">
        <Image src={event.image} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-5 rounded-full border border-amber/25 bg-black/45 px-4 py-2 text-sm text-champagne">
          {formatCurrency(event.price)}
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <h3 className="font-display text-3xl text-white">{event.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/62">{event.description}</p>
        </div>
        <div className="grid gap-3 text-sm text-white/70 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-black/20 px-3 py-3">
            <CalendarDays className="h-4 w-4 text-amber" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-black/20 px-3 py-3">
            <Clock3 className="h-4 w-4 text-amber" />
            {event.startHour}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-black/20 px-3 py-3">
            <Ticket className="h-4 w-4 text-amber" />
            {event.duration}
          </div>
        </div>
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex rounded-full bg-gradient-to-r from-amber to-bronze px-6 py-3 text-sm font-semibold text-black"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
