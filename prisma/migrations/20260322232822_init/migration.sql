-- CreateTable
CREATE TABLE "Internship" (
    "id" SERIAL NOT NULL,
    "arm" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "rrhh" TEXT NOT NULL,
    "interview_timetable" TEXT NOT NULL,
    "knowledge" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "payment" INTEGER NOT NULL,
    "timetable" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "benefits" TEXT NOT NULL,
    "interns" INTEGER NOT NULL,
    "workplace" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "mail" TEXT,
    "observations" TEXT,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternshipCareer" (
    "internship_id" INTEGER NOT NULL,
    "career_id" TEXT NOT NULL,

    CONSTRAINT "InternshipCareer_pkey" PRIMARY KEY ("internship_id","career_id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Internship_arm_key" ON "Internship"("arm");

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipCareer" ADD CONSTRAINT "InternshipCareer_internship_id_fkey" FOREIGN KEY ("internship_id") REFERENCES "Internship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipCareer" ADD CONSTRAINT "InternshipCareer_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
