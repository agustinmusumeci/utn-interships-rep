/*
  Warnings:

  - Added the required column `payment` to the `Intership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Intership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workplace` to the `Intership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Intership" ADD COLUMN     "payment" TEXT NOT NULL,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "workplace" TEXT NOT NULL;
