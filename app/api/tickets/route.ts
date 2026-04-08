import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { isValidRomanianCNP } from "@/lib/cnp";
import { safeEventSelect } from "@/lib/event-records";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  eventId: z.string().min(1),
  fullName: z.string().min(3),
  email: z.string().email(),
  cnp: z.string().regex(/^\d{13}$/)
});

export async function POST(request: Request) {
  const user = await requireUser();
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Completează toate datele pentru checkout." }, { status: 400 });
  }

  if (!isValidRomanianCNP(parsed.data.cnp)) {
    return NextResponse.json({ error: "Introduceți un CNP valid" }, { status: 400 });
  }

  const event = await prisma.event.findUnique({ where: { id: parsed.data.eventId }, select: safeEventSelect });

  if (!event) {
    return NextResponse.json({ error: "Evenimentul nu există." }, { status: 404 });
  }

  const ticket = await prisma.ticket.create({
    data: {
      eventId: event.id,
      userId: user.id,
      buyerName: parsed.data.fullName,
      buyerEmail: parsed.data.email,
      cnp: parsed.data.cnp,
      code: `GCB-${randomUUID().slice(0, 8).toUpperCase()}`
    }
  });

  return NextResponse.json({ ok: true, ticket });
}
