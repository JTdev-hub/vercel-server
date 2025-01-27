/*
  Warnings:

  - A unique constraint covering the columns `[assetNumber]` on the table `AssetHeader` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AssetHeader_assetNumber_key" ON "AssetHeader"("assetNumber");
