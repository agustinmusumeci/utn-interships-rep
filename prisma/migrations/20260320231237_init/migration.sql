-- CreateTable
CREATE TABLE "Intership" (
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

    CONSTRAINT "Intership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntershipCareer" (
    "intership_id" INTEGER NOT NULL,
    "career_id" TEXT NOT NULL,

    CONSTRAINT "IntershipCareer_pkey" PRIMARY KEY ("intership_id","career_id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Intership_arm_key" ON "Intership"("arm");

-- AddForeignKey
ALTER TABLE "Intership" ADD CONSTRAINT "Intership_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntershipCareer" ADD CONSTRAINT "IntershipCareer_intership_id_fkey" FOREIGN KEY ("intership_id") REFERENCES "Intership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntershipCareer" ADD CONSTRAINT "IntershipCareer_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
