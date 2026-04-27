import { UNIVERSITIES_CAREERS } from "@/constants/universitiesCareers";
import { PrismaClient, Prisma } from "../prisma/generated/client";
import { UploadController } from "../src/controllers/upload.controller";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  console.log("Starting to seed...");

  for (const univerity of UNIVERSITIES_CAREERS) {
    for (const career of univerity.careers) {
      // Create or update careers
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

    // Create or update university
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

    // Add UniversityCareer tuples
    await prisma.universityCareer.createMany({ data: univerity.careers.map((c) => ({ university_id: univerity.id, career_id: c.id })) ?? [], skipDuplicates: true });
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
