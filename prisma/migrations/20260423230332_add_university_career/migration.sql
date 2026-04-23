-- CreateTable
CREATE TABLE "UniversityCareer" (
    "university_id" TEXT NOT NULL,
    "career_id" TEXT NOT NULL,

    CONSTRAINT "UniversityCareer_pkey" PRIMARY KEY ("university_id","career_id")
);

-- AddForeignKey
ALTER TABLE "UniversityCareer" ADD CONSTRAINT "UniversityCareer_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityCareer" ADD CONSTRAINT "UniversityCareer_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
