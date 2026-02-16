/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `JobOffer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `JobOffer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."JobOffer" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "JobOffer_slug_key" ON "public"."JobOffer"("slug");
