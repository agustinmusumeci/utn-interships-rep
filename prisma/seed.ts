import { PrismaClient, Prisma } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const intershipsData: Prisma.IntershipCreateInput[] = [
  {
    company: "Mercado Libre",
    degree: "Ingenería en Sistemas de Información",
    knowledge: "Python and Django",
    timetable: "Desde 9:00hs hasta 12hs",
    position: "Tech leader Backend Senior",
    workplace: "Av. Colon 1111",
    payment: "$5.000.000",
    link: "https://mercadolibre.com",
    mode: "Remoto",
  },
];

export async function main() {
  console.log("Starting to seed...");

  for (const i of intershipsData) {
    await prisma.intership.create({ data: i });
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
