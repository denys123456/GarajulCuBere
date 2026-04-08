import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createGalleryItem, getGalleryItems } from "@/lib/gallery-store";

const schema = z.object({
  title: z.string().min(1, "Titlul imaginii este obligatoriu."),
  image: z.string().min(1, "Imaginea galeriei lipseste. Incarca imaginea mai intai.")
});

export async function GET() {
  const items = await getGalleryItems();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  await requireAdmin();
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Date invalide." }, { status: 400 });
  }

  const item = await createGalleryItem({ title: parsed.data.title.trim(), image: parsed.data.image });

  return NextResponse.json({ ok: true, item });
}
