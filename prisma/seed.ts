import { PrismaClient, Prisma } from "../prisma/generated/client";
import { UploadController } from "../src/controllers/upload.controller";
import { PrismaPg } from "@prisma/adapter-pg";
import { CAREERS } from "../src/constants/careers";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  console.log("Starting to seed...");

  for (const i of CAREERS) {
    await prisma.career.upsert({
      where: { id: i.id },
      update: {
        name: i.name,
        color: i.color,
        bg: i.bg,
      },
      create: {
        id: i.id,
        name: i.name,
        color: i.color,
        bg: i.bg,
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
