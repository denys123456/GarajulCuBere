import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock3, CalendarDays, MapPin, Ticket } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { ensureSeedData } from "@/lib/bootstrap";
import { SafeEventRecord, safeEventSelect, withOptionalEventDefaults } from "@/lib/event-records";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TicketPurchaseCard } from "@/components/ticket-purchase-card";

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  await ensureSeedData();
  const { slug } = await params;
  let event: SafeEventRecord | null = null;
  let user: Awaited<ReturnType<typeof getCurrentUser>> = null;

  try {
    [event, user] = await Promise.all([
      prisma.event.findUnique({ where: { slug }, select: safeEventSelect }).then(withOptionalEventDefaults),
      getCurrentUser()
    ]);
  } catch (error) {
    console.error("EventDetailsPage load failed", error);
  }

  if (!event) {
    notFound();
  }

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] border border-[#e5d8c5] bg-white shadow-panel">
            <div className="relative h-[420px]">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f241c]/45 via-[#2f241c]/5 to-transparent" />
            </div>
          </div>
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="section-kicker">Event Details</p>
            <h1 className="mt-4 font-display text-6xl font-semibold tracking-[-0.05em] text-ink">{event.title}</h1>
            <p className="mt-4 text-sm leading-8 text-ink/62">{event.description}</p>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 text-sm text-ink/75 shadow-[0_8px_20px_rgba(67,46,21,0.06)]">
                <CalendarDays className="mb-3 h-5 w-5 text-amber" />
                {formatDate(event.date)}
              </div>
              <div className="rounded-2xl bg-white p-4 text-sm text-ink/75 shadow-[0_8px_20px_rgba(67,46,21,0.06)]">
                <Clock3 className="mb-3 h-5 w-5 text-amber" />
                {event.startHour}
              </div>
              <div className="rounded-2xl bg-white p-4 text-sm text-ink/75 shadow-[0_8px_20px_rgba(67,46,21,0.06)]">
                <Ticket className="mb-3 h-5 w-5 text-amber" />
                {event.duration}
              </div>
            </div>
            {(event.location || event.address) && (
              <div className="mt-3 rounded-2xl bg-white p-4 text-sm text-ink/75 shadow-[0_8px_20px_rgba(67,46,21,0.06)]">
                <MapPin className="mb-3 h-5 w-5 text-amber" />
                {event.location && <div>{event.location}</div>}
                {event.address && <div className="mt-1 text-ink/55">{event.address}</div>}
              </div>
            )}
            <div className="mt-8 inline-flex rounded-full bg-[#fbf5eb] px-5 py-3 text-sm font-medium text-amber">
              {formatCurrency(event.price)}
            </div>
          </div>
        </div>

        <TicketPurchaseCard eventId={event.id} requiresAuth={!user} />
      </div>
    </div>
  );
}
