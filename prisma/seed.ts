import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";
import { seedEvents } from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
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
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: event
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
