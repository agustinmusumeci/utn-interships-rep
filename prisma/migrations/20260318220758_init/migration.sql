-- CreateTable
CREATE TABLE "Intership" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "knowledge" TEXT NOT NULL,
    "timetable" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "mode" TEXT NOT NULL,

    CONSTRAINT "Intership_pkey" PRIMARY KEY ("id")
);
