/*
  Warnings:

  - You are about to drop the column `Descricao` on the `Promotion` table. All the data in the column will be lost.
  - Added the required column `link` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "Descricao",
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
