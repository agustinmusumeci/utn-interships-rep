import { PrismaClient, Prisma } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { careers } from "../src/constants/careers";
import { UploadController } from "../src/controllers/upload.controller";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  console.log("Starting to seed...");

  for (const i of careers) {
    await prisma.career.createMany({ data: { id: i.id, name: i.name, color: i.color }, skipDuplicates: true });
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
