-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "university_id" TEXT;

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE SET NULL ON UPDATE CASCADE;
