import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { deleteStoredEvent, updateStoredEvent } from "@/lib/events-store";

const schema = z.object({
  title: z.string().min(3, "Titlul trebuie sa aiba cel putin 3 caractere."),
  image: z.string().min(1, "Imaginea evenimentului lipseste. Incarca o poza mai intai."),
  description: z.string().min(10, "Descrierea trebuie sa aiba cel putin 10 caractere."),
  price: z.coerce.number().min(0, "Pretul trebuie sa fie 0 sau mai mare."),
  date: z.string().min(1, "Data evenimentului este obligatorie."),
  duration: z.string().min(1, "Durata evenimentului este obligatorie."),
  startHour: z.string().min(1, "Ora de inceput este obligatorie."),
  location: z.string().optional().default(""),
  address: z.string().optional().default("")
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Formularul contine date invalide.";
    return NextResponse.json(
      {
        error: firstError,
        fieldErrors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
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
