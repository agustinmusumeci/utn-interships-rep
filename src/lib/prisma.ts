import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma/generated/client";
import dotenv from "dotenv";
dotenv.config({ path: "/.env" });

const connectionString = (typeof process !== "undefined" && process.env.DATABASE_URL) || (import.meta as any).env?.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default prisma;
