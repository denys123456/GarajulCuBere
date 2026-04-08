import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";
import { safeUpsertEvent } from "../lib/event-records";
import { seedEvents } from "../lib/seed-data";

async function main() {
  const prisma = new PrismaClient();
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@garajulcubere.ro";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Garaj2026!";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
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
    await safeUpsertEvent(event, prisma);
  }

  await prisma.$disconnect();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
