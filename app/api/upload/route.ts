import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  await requireAdmin();

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Selecteaza un fisier valid." }, { status: 400 });
  }

  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDirectory, { recursive: true });

  const extension = path.extname(file.name) || ".jpg";
  const fileName = `${randomUUID()}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(uploadDirectory, fileName), buffer);

  return NextResponse.json({
    ok: true,
    url: `/uploads/${fileName}`
  });
}
