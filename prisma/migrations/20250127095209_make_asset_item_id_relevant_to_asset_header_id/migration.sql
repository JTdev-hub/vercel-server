/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `AssetItems` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AssetItems" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "AssetItems_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "AssetItems_id_key" ON "AssetItems"("id");
