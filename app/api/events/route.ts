import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

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

export async function POST(request: Request) {
  await requireAdmin();
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Completează formularul corect." }, { status: 400 });
  }

  const event = await prisma.event.create({
    data: {
      ...parsed.data,
      slug: slugify(parsed.data.title),
      date: new Date(parsed.data.date)
    }
  });

  return NextResponse.json({ ok: true, event });
}
