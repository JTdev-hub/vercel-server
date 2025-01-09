import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allowed HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "GET") {
    try {
      const assetHeaders = await prismaClient.assetHeader.findMany();
      res.status(200).json(assetHeaders);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const {
        customerId,
        assetNumber,
        assetDescription,
        assetSerialNo,
        siteSection,
      } = req.body;
      const newAssetHeader = await prismaClient.assetHeader.create({
        data: {
          customerId,
          assetNumber,
          assetDescription,
          assetSerialNo,
          siteSection,
        },
      });

      res.status(200).json(newAssetHeader);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
