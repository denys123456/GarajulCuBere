import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { deleteGalleryItem } from "@/lib/gallery-store";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const deleted = await deleteGalleryItem(id);

  if (!deleted) {
    return NextResponse.json({ error: "Imaginea nu a fost gasita." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
