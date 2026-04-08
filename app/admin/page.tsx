import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { ensureSeedData } from "@/lib/bootstrap";
import { isPastEvent } from "@/lib/event-utils";
import { SelectedEventRecord, safeEventSelect, withEventDefaults } from "@/lib/event-records";
import { getGalleryItems } from "@/lib/gallery-store";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { AdminGalleryManager } from "@/components/admin-gallery-manager";

function EventManagementSection({
  title,
  events
}: {
  title: string;
  events: {
    id: string;
    title: string;
    description: string;
    date: Date;
    price: number;
  }[];
}) {
  return (
    <section className="glass-panel rounded-[2rem] p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">Gestionare evenimente</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">{title}</h2>
        </div>
        <span className="rounded-full bg-[#f5efe6] px-4 py-2 text-sm text-ink/65">{events.length} evenimente</span>
      </div>

      <div className="mt-8 grid gap-4">
        {events.map((event) => (
          <article key={event.id} className="rounded-[1.75rem] border border-[#e5d8c5] bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-3xl font-semibold text-ink">{event.title}</h3>
                <p className="mt-1 text-sm text-ink/52">{formatDate(event.date)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#fbf5eb] px-4 py-2 text-sm font-medium text-amber">
                  {formatCurrency(event.price)}
                </span>
                <Link href={`/admin/events/${event.id}/edit`} className="text-sm font-medium text-ink">
                  Editeaza
                </Link>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-ink/58">{event.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function AdminPage() {
  await ensureSeedData();
  await requireAdmin();

  let events: SelectedEventRecord[] = [];
  let tickets: Array<{
    id: string;
    code: string;
    buyerName: string;
    buyerEmail: string;
    cnp: string;
    status: "CONFIRMED";
    purchasedAt: Date;
    eventId: string;
    userId: string;
    event: {
      id: string;
      title: string;
      date: Date;
    };
    user: {
      email: string;
    };
  }> = [];
  let galleryItems: Awaited<ReturnType<typeof getGalleryItems>> = [];

  try {
    [events, tickets, galleryItems] = await Promise.all([
      prisma.event.findMany({
        select: safeEventSelect,
        orderBy: { date: "asc" }
      }),
      prisma.ticket.findMany({
        include: {
          event: {
            select: {
              id: true,
              title: true,
              date: true
            }
          },
          user: true
        },
        orderBy: {
          purchasedAt: "desc"
        }
      }),
      getGalleryItems()
    ]);
  } catch (error) {
    console.error("AdminPage data load failed", error);
  }

  const normalizedEvents = events.map(withEventDefaults);

  const activeEvents = normalizedEvents.filter((event) => !isPastEvent(event));
  const pastEvents = normalizedEvents.filter((event) => isPastEvent(event)).sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Admin Panel</p>
          <h1 className="section-title mt-3">Gestionare continut</h1>
        </div>
        <Link href="/admin/events/new" className="cta-primary">
          Adauga eveniment
        </Link>
      </div>

      <div className="grid gap-6">
        <EventManagementSection title="Evenimente active" events={activeEvents} />
        <EventManagementSection title="Evenimente trecute" events={pastEvents} />
        <AdminGalleryManager items={galleryItems} />

        <section className="glass-panel rounded-[2rem] p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-kicker">Vanzari</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-ink">Bilete cumparate</h2>
            </div>
            <span className="rounded-full bg-[#f5efe6] px-4 py-2 text-sm text-ink/65">{tickets.length} vanzari</span>
          </div>

          <div className="mt-8 grid gap-4">
            {tickets.map((ticket) => (
              <article key={ticket.id} className="rounded-[1.75rem] border border-[#e5d8c5] bg-white p-6 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-ink">{ticket.event.title}</h3>
                    <p className="mt-1 text-ink/50">{ticket.buyerName}</p>
                  </div>
                  <span className="rounded-full bg-[#fbf5eb] px-3 py-1 text-xs font-medium text-amber">{ticket.status}</span>
                </div>
                <div className="mt-4 grid gap-2 text-ink/65">
                  <div>Email: {ticket.buyerEmail}</div>
                  <div>CNP: {ticket.cnp}</div>
                  <div>Purchased: {formatDate(ticket.purchasedAt)}</div>
                  <div>Code: {ticket.code}</div>
                  <div>Account: {ticket.user.email}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
