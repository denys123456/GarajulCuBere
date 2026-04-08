import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { AdminEventForm } from "@/components/admin-event-form";
import { safeEventSelect, withOptionalEventDefaults } from "@/lib/event-records";
import { prisma } from "@/lib/prisma";

export default async function EditAdminEventPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id }, select: safeEventSelect }).then(withOptionalEventDefaults);

  if (!event) {
    notFound();
  }

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <AdminEventForm mode="edit" event={event} />
    </div>
  );
}
