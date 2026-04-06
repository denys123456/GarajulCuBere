import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { LogoutButton } from "@/components/logout-button";

export default async function AccountPage() {
  const user = await requireUser();

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="premium-border glass-panel rounded-[2rem] p-8">
          <p className="section-kicker">Account</p>
          <h1 className="mt-4 font-display text-5xl text-white">{user.fullName}</h1>
          <p className="mt-3 text-sm text-white/58">{user.email}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/events"
              className="rounded-full bg-gradient-to-r from-amber to-bronze px-5 py-3 text-sm font-semibold text-black"
            >
              Browse Events
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="premium-border glass-panel rounded-[2rem] p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">My Tickets</p>
              <h2 className="mt-3 font-display text-4xl text-white">Saved in account</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">
              {user.tickets.length} tickets
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            {user.tickets.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-black/20 p-6 text-sm text-white/52">
                Încă nu ai bilete cumpărate. Intră în secțiunea Events și finalizează checkout-ul din contul tău.
              </div>
            ) : (
              user.tickets.map((ticket) => (
                <article key={ticket.id} className="rounded-[1.75rem] border border-white/10 bg-black/25 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl text-white">{ticket.event.title}</h3>
                      <p className="mt-1 text-sm text-white/52">{formatDate(ticket.event.date)}</p>
                    </div>
                    <span className="rounded-full border border-amber/20 bg-amber/10 px-4 py-2 text-sm text-champagne">
                      {ticket.status}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-white/68 md:grid-cols-2">
                    <div>Buyer name: {ticket.buyerName}</div>
                    <div>Email: {ticket.buyerEmail}</div>
                    <div>CNP: {ticket.cnp}</div>
                    <div>Purchase time: {formatDate(ticket.purchasedAt)}</div>
                    <div>Ticket code: {ticket.code}</div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
