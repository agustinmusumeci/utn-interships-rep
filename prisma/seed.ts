import { PrismaClient, Prisma } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { careers } from "../src/constants/careers";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const companiesData: Prisma.CompanyCreateInput[] = [
  {
    id: "mercadolibre",
    name: "Mercado Libre Córdoba",
  },
];

const internshipsData: Prisma.InternshipCreateInput[] = [
  {
    arm: "24/26",
    company_id: "mercadolibre",
    city: "Córdoba",
    rrhh: "Juan Perez",
    interview_timetable: "A definir en MAYO",
    knowledge: "Conocimientos en backend y diseño de sistemas.",
    requirements: "Python y Go (deseables)",
    payment: 500000,
    timetable: "8:00hs a 12:00hs",
    position: "Desarrollador backend",
    benefits: "Obra Social Prepaga",
    interns: 2,
    workplace: "Av. Colon 4501",
    modality: "Híbrida",
    link: "https://test.com",
    mail: "rrhh.postulaciones@meli.com.ar",
  },
];

const internshipCareersData: Prisma.InternshipCareerCreateInput[] = [
  {
    internship_id: 1,
    career_id: "SISTEMAS",
  },
];

export async function main() {
  console.log("Starting to seed...");

  for (const i of companiesData) {
    await prisma.company.create({ data: i });
  }

  for (const i of careers) {
    const created = await prisma.career.create({ data: { id: i, name: i } });
  }

  for (const i of internshipsData) {
    await prisma.internship.create({ data: i });
  }

  // El problema es que el "internship_id" se esta tomando como "1"
  for (const i of internshipCareersData) {
    await prisma.internshipCareer.create({ data: i });
  }

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
