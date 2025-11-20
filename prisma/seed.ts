import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../utils/password";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@tpay.app";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (existing) {
    console.info("Seed skipped: admin already exists.");
    return;
  }

  const passwordHash = await hashPassword("ChangeMe123!");

  await prisma.user.create({
    data: {
      email: adminEmail,
      name: "Admin User",
      role: Role.ADMIN,
      walletBalance: 1000,
      referralCode: "ADMIN-GOLD",
      passwordHash,
      points: 1200,
    },
  });

  console.info("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

