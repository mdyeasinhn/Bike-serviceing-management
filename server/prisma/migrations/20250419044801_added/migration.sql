/*
  Warnings:

  - The values [Honda,Yamaha] on the enum `Brand` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING,INPROGRESS,DONE] on the enum `ServiceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Brand_new" AS ENUM ('HONDA', 'YAMAHA');
ALTER TABLE "Bike" ALTER COLUMN "brand" TYPE "Brand_new" USING ("brand"::text::"Brand_new");
ALTER TYPE "Brand" RENAME TO "Brand_old";
ALTER TYPE "Brand_new" RENAME TO "Brand";
DROP TYPE "Brand_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ServiceStatus_new" AS ENUM ('pending', 'inprogress', 'done');
ALTER TABLE "services" ALTER COLUMN "status" TYPE "ServiceStatus_new" USING ("status"::text::"ServiceStatus_new");
ALTER TYPE "ServiceStatus" RENAME TO "ServiceStatus_old";
ALTER TYPE "ServiceStatus_new" RENAME TO "ServiceStatus";
DROP TYPE "ServiceStatus_old";
COMMIT;
