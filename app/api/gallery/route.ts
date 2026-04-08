import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createGalleryItem, getGalleryItems } from "@/lib/gallery-store";

export async function GET() {
  const items = await getGalleryItems();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  await requireAdmin();

  const formData = await request.formData();
  const title = formData.get("title");
  const file = formData.get("file");

  if (typeof title !== "string" || !title.trim() || !(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Selecteaza o imagine si completeaza titlul." }, { status: 400 });
  }

  const item = await createGalleryItem({ title: title.trim(), file });

  return NextResponse.json({ ok: true, item });
}
