import { requireAdmin } from "@/lib/auth";
import { AdminEventForm } from "@/components/admin-event-form";

export default async function NewAdminEventPage() {
  await requireAdmin();

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <AdminEventForm mode="create" />
    </div>
  );
}
