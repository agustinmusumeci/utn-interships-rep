import { PrismaClient, Prisma } from "../prisma/generated/client";
import { UploadController } from "../src/controllers/upload.controller";
import { PrismaPg } from "@prisma/adapter-pg";
import { CAREERS } from "../src/constants/careers";
import { UNIVERSITIES } from "@/constants/universities";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  console.log("Starting to seed...");

  for (const career of CAREERS) {
    await prisma.career.upsert({
      where: { id: career.id },
      update: {
        name: career.name,
        color: career.color,
        bg: career.bg,
      },
      create: {
        id: career.id,
        name: career.name,
        color: career.color,
        bg: career.bg,
      },
    });
  }

  for (const univerity of UNIVERSITIES) {
    await prisma.university.upsert({
      where: { id: univerity.id },
      update: {
        name: univerity.name,
      },
      create: {
        id: univerity.id,
        name: univerity.name,
      },
    });
  }

  const uploader = new UploadController();

  await uploader.uploadData();

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
