import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";
import allowCors from "../helper/allowCors";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    try {
      const { customerName } = req.query;
      const assetHeaders = await prismaClient.assetHeader.findMany({
        where: {
          customer: {
            customerName: {
              contains: customerName as string,
            },
          },
        },
        include: {
          customer: true,
        },
      });
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

      const savedAssetHeader = await prismaClient.assetHeader.findUnique({
        where: {
          id: newAssetHeader.id,
        },
        include: {
          customer: true,
        },
      });

      res.status(200).json(savedAssetHeader);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default allowCors(handler);
