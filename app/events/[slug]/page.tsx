import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock3, CalendarDays, Ticket } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { ensureSeedData } from "@/lib/bootstrap";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TicketPurchaseCard } from "@/components/ticket-purchase-card";

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await ensureSeedData();
  const { slug } = await params;
  const [event, user] = await Promise.all([
    prisma.event.findUnique({ where: { slug } }),
    getCurrentUser()
  ]);

  if (!event) {
    notFound();
  }

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-6">
          <div className="premium-border glass-panel overflow-hidden rounded-[2rem]">
            <div className="relative h-[420px]">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
            </div>
          </div>
          <div className="premium-border glass-panel rounded-[2rem] p-8">
            <p className="section-kicker">Event Details</p>
            <h1 className="mt-4 font-display text-6xl text-white">{event.title}</h1>
            <p className="mt-4 text-sm leading-8 text-white/62">{event.description}</p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-white/75">
                <CalendarDays className="mb-3 h-5 w-5 text-amber" />
                {formatDate(event.date)}
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-white/75">
                <Clock3 className="mb-3 h-5 w-5 text-amber" />
                {event.startHour}
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-white/75">
                <Ticket className="mb-3 h-5 w-5 text-amber" />
                {event.duration}
              </div>
            </div>
            <div className="mt-8 inline-flex rounded-full border border-amber/20 bg-amber/10 px-5 py-3 text-sm text-champagne">
              {formatCurrency(event.price)}
            </div>
          </div>
        </div>

        <TicketPurchaseCard eventId={event.id} requiresAuth={!user} />
      </div>
    </div>
  );
}
