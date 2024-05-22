/*
  Warnings:

  - Made the column `pet_id` on table `AdoptionRequirements` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AdoptionRequirements" DROP CONSTRAINT "AdoptionRequirements_pet_id_fkey";

-- AlterTable
ALTER TABLE "AdoptionRequirements" ALTER COLUMN "pet_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "AdoptionRequirements" ADD CONSTRAINT "AdoptionRequirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
