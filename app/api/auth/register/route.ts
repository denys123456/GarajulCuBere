import { NextResponse } from "next/server";
import { z } from "zod";
import { createSession, hashPassword } from "@/lib/auth";
import { ensureSeedData } from "@/lib/bootstrap";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5)
});

export async function POST(request: Request) {
  await ensureSeedData();
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Completează corect toate câmpurile." }, { status: 400 });
  }

  const { fullName, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return NextResponse.json({ error: "Există deja un cont cu acest email." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash: await hashPassword(password)
    }
  });

  await createSession({
    sub: user.id,
    email: user.email,
    role: user.role,
    fullName: user.fullName
  });

  return NextResponse.json({ ok: true, redirectTo: "/account" });
}
