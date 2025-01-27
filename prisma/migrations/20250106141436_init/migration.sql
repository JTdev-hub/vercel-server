-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT,
    "customerSite" TEXT,
    "customerContact" TEXT,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetHeader" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "assetNumber" TEXT,
    "assetDescription" TEXT,
    "assetSerialNo" TEXT,
    "siteSection" TEXT,

    CONSTRAINT "AssetHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetItems" (
    "id" SERIAL NOT NULL,
    "assetHeaderId" INTEGER NOT NULL,
    "duty" TEXT,
    "specification" TEXT,
    "valveType" TEXT,
    "valveSize" TEXT,
    "model" TEXT,
    "actuation" TEXT,
    "actuationType" TEXT,
    "flangeConnection" TEXT,
    "instrumentation" TEXT,
    "oemPartNumber" TEXT,
    "ansi" TEXT,
    "generalNotes" TEXT,
    "images" TEXT,

    CONSTRAINT "AssetItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AssetHeader" ADD CONSTRAINT "AssetHeader_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetItems" ADD CONSTRAINT "AssetItems_assetHeaderId_fkey" FOREIGN KEY ("assetHeaderId") REFERENCES "AssetHeader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
