-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "suscripted" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCareer" (
    "user_id" TEXT NOT NULL,
    "career_id" TEXT NOT NULL,

    CONSTRAINT "UserCareer_pkey" PRIMARY KEY ("user_id","career_id")
);

-- AddForeignKey
ALTER TABLE "UserCareer" ADD CONSTRAINT "UserCareer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCareer" ADD CONSTRAINT "UserCareer_career_id_fkey" FOREIGN KEY ("career_id") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
