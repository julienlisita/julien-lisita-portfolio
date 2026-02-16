/*
  Warnings:

  - The `equipments` column on the `JobOffer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `description` on table `JobOffer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."JobOffer" ALTER COLUMN "description" SET NOT NULL,
DROP COLUMN "equipments",
ADD COLUMN     "equipments" TEXT[];
