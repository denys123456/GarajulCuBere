import { NextResponse } from "next/server";
import { z } from "zod";
import { createSession, verifyPassword } from "@/lib/auth";
import { ensureSeedData } from "@/lib/bootstrap";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  await ensureSeedData();
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datele introduse nu sunt valide." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "Email sau parolă incorecte." }, { status: 401 });
  }

  await createSession({
    sub: user.id,
    email: user.email,
    role: user.role,
    fullName: user.fullName
  });

  return NextResponse.json({
    ok: true,
    redirectTo: user.role === "ADMIN" ? "/admin" : "/account"
  });
}
