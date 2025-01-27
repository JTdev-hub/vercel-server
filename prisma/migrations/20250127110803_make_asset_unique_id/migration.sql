/*
  Warnings:

  - The primary key for the `AssetItems` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "AssetItems_id_assetHeaderId_key";

-- AlterTable
ALTER TABLE "AssetItems" DROP CONSTRAINT "AssetItems_pkey",
ADD CONSTRAINT "AssetItems_pkey" PRIMARY KEY ("id", "assetHeaderId");
