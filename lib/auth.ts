import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { safeEventSelect, withEventDefaults } from "@/lib/event-records";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "garajul-session";

type SessionPayload = {
  sub: string;
  email: string;
  role: Role;
  fullName: string;
};

function getSecret() {
  const secret = process.env.JWT_SECRET ?? "dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());

    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session?.sub) {
    return null;
  }

  try {
    return await prisma.user.findUnique({
      where: { id: session.sub },
      include: {
        tickets: {
          include: {
            event: {
              select: safeEventSelect
            }
          },
          orderBy: {
            purchasedAt: "desc"
          }
        }
      }
    }).then((user) => {
      if (!user) {
        return null;
      }

      return {
        ...user,
        tickets: user.tickets.map((ticket) => ({
          ...ticket,
          event: withEventDefaults(ticket.event)
        }))
      };
    });
  } catch (error) {
    console.error("getCurrentUser failed", error);
    return null;
  }
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();

  if (user.role !== "ADMIN") {
    redirect("/account");
  }

  return user;
}
