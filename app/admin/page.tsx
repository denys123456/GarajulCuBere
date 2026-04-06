import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { ensureSeedData } from "@/lib/bootstrap";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminPage() {
  await ensureSeedData();
  await requireAdmin();

  const [events, tickets] = await Promise.all([
    prisma.event.findMany({
      orderBy: { date: "asc" }
    }),
    prisma.ticket.findMany({
      include: {
        event: true,
        user: true
      },
      orderBy: {
        purchasedAt: "desc"
      }
    })
  ]);

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">Admin Panel</p>
          <h1 className="section-title mt-3">Events, control and sales</h1>
        </div>
        <Link
          href="/admin/events/new"
          className="rounded-full bg-gradient-to-r from-amber to-bronze px-5 py-3 text-sm font-semibold text-black"
        >
          Add event
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="premium-border glass-panel rounded-[2rem] p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-kicker">Events</p>
              <h2 className="mt-3 font-display text-4xl text-white">Live inventory</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">
              {events.length} total
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            {events.map((event) => (
              <article key={event.id} className="rounded-[1.75rem] border border-white/10 bg-black/25 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-white/52">{formatDate(event.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-amber/20 bg-amber/10 px-4 py-2 text-sm text-champagne">
                      {formatCurrency(event.price)}
                    </span>
                    <Link href={`/admin/events/${event.id}/edit`} className="text-sm text-white">
                      Edit
                    </Link>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/58">{event.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="premium-border glass-panel rounded-[2rem] p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-kicker">Ticket Purchases</p>
              <h2 className="mt-3 font-display text-4xl text-white">Account-tied orders</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">
              {tickets.length} sales
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            {tickets.map((ticket) => (
              <article key={ticket.id} className="rounded-[1.75rem] border border-white/10 bg-black/25 p-6 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-white">{ticket.event.title}</h3>
                    <p className="mt-1 text-white/50">{ticket.buyerName}</p>
                  </div>
                  <span className="rounded-full border border-amber/20 bg-amber/10 px-3 py-1 text-xs text-champagne">
                    {ticket.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-white/65">
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
