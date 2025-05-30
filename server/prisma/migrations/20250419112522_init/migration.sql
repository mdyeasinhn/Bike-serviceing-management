/*
  Warnings:

  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `services` table. All the data in the column will be lost.
  - The required column `serviceId` was added to the `services` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "services" DROP CONSTRAINT "services_pkey",
DROP COLUMN "id",
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD CONSTRAINT "services_pkey" PRIMARY KEY ("serviceId");
