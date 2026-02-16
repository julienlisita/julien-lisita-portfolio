/*
  Warnings:

  - Made the column `contractType` on table `JobOffer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."JobOffer" ADD COLUMN     "equipments" JSONB,
ADD COLUMN     "missionStatement" TEXT,
ADD COLUMN     "remunerationNote" TEXT,
ADD COLUMN     "reportingLine" TEXT,
ADD COLUMN     "scheduleNote" TEXT,
ADD COLUMN     "sections" JSONB,
ADD COLUMN     "service" TEXT,
ADD COLUMN     "workMode" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "contractType" SET NOT NULL;

-- CreateIndex
CREATE INDEX "JobOffer_publishedAt_idx" ON "public"."JobOffer"("publishedAt");
