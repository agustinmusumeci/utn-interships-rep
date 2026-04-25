-- CreateTable
CREATE TABLE "UserSaveInternship" (
    "user_id" TEXT NOT NULL,
    "internship_id" INTEGER NOT NULL,

    CONSTRAINT "UserSaveInternship_pkey" PRIMARY KEY ("user_id","internship_id")
);

-- AddForeignKey
ALTER TABLE "UserSaveInternship" ADD CONSTRAINT "UserSaveInternship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSaveInternship" ADD CONSTRAINT "UserSaveInternship_internship_id_fkey" FOREIGN KEY ("internship_id") REFERENCES "Internship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
