import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { safeUpsertEvent } from "@/lib/event-records";
import { seedEvents } from "@/lib/seed-data";

let bootstrapped = false;

export async function ensureSeedData() {
  if (bootstrapped) {
    return;
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@garajulcubere.ro";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "Garaj2026!";

    const admin = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!admin) {
      await prisma.user.create({
        data: {
          fullName: "Garajul Admin",
          email: adminEmail,
          passwordHash: await bcrypt.hash(adminPassword, 10),
          role: Role.ADMIN
        }
      });
    }

    for (const event of seedEvents) {
      await safeUpsertEvent(event);
    }

    bootstrapped = true;
  } catch (error) {
    console.error("ensureSeedData failed", error);
  }
}
