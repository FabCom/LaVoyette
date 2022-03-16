/*
  Warnings:

  - You are about to drop the column `name` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Artist` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "name",
DROP COLUMN "surname",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;
