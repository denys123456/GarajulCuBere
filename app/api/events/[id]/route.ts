import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { deleteStoredEvent, updateStoredEvent } from "@/lib/events-store";

const schema = z.object({
  title: z.string().min(3),
  image: z.string().min(1),
  description: z.string().min(10),
  price: z.coerce.number().min(0),
  date: z.string().min(1),
  duration: z.string().min(1),
  startHour: z.string().min(1),
  location: z.string().optional().default(""),
  address: z.string().optional().default("")
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datele nu sunt valide." }, { status: 400 });
  }

  const event = await updateStoredEvent(id, parsed.data);

  if (!event) {
    return NextResponse.json({ error: "Evenimentul nu a fost gasit." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, event });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const deleted = await deleteStoredEvent(id);

  if (!deleted) {
    return NextResponse.json({ error: "Evenimentul nu a fost gasit." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
