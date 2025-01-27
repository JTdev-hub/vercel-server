import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";
import allowCors from "../helper/allowCors";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    try {
      const { dataQuery } = req.query as { dataQuery: string };

      const queryConditions = [
        { customer: { customerName: { contains: dataQuery } } },
        { assetNumber: { contains: dataQuery } },
        { assetDescription: { contains: dataQuery } },
        { assetSerialNo: { contains: dataQuery } },
        { siteSection: { contains: dataQuery } },
      ];

      const assetHeaders = await prismaClient.assetHeader.findMany({
        where: {
          OR: queryConditions,
        },
        include: {
          customer: true,
        },
      });

      res.status(200).json(assetHeaders);
    } catch (error) {
      res.status(500).json({ message: "Internal server error.", error });
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

      // Attempt to create a new AssetHeader
      const newAssetHeader = await prismaClient.assetHeader.create({
        data: {
          customerId,
          assetNumber,
          assetDescription,
          assetSerialNo,
          siteSection,
        },
      });

      // Fetch the newly created AssetHeader with customer details
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
      // Handle unique constraint violation
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          res.status(409).json("Asset Header is already existing");
        } else {
          res.status(500).json(error);
        }
      }
    }
  }
};

export default allowCors(handler);
