-- CreateTable
CREATE TABLE "UserKeyword" (
    "user_id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,

    CONSTRAINT "UserKeyword_pkey" PRIMARY KEY ("user_id","keyword")
);

-- AddForeignKey
ALTER TABLE "UserKeyword" ADD CONSTRAINT "UserKeyword_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
