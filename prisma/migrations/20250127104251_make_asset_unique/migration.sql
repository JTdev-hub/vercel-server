/*
  Warnings:

  - A unique constraint covering the columns `[id,assetHeaderId]` on the table `AssetItems` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AssetItems_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "AssetItems_id_assetHeaderId_key" ON "AssetItems"("id", "assetHeaderId");
