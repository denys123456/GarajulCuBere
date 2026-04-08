import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Nu a fost selectat niciun fisier." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Fisierul selectat trebuie sa fie o imagine." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Imaginea este prea mare. Limita maxima este 10MB." }, { status: 400 });
    }

    const extension = path.extname(file.name) || ".jpg";
    const fileName = `${randomUUID()}${extension}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`events/${fileName}`, file, {
        access: "public",
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });

      return NextResponse.json({
        ok: true,
        url: blob.url
      });
    }

    const uploadDirectory = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDirectory, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDirectory, fileName), buffer);

    return NextResponse.json({
      ok: true,
      url: `/uploads/${fileName}`
    });
  } catch (error) {
    console.error("upload failed", error);
    return NextResponse.json(
      {
        error:
          process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN
            ? "Upload-ul nu este configurat pe Vercel. Adauga BLOB_READ_WRITE_TOKEN in Environment Variables."
            : "Upload-ul imaginii a esuat pe server."
      },
      { status: 500 }
    );
  }
}
