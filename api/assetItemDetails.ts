import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";
import allowCors from "../helper/allowCors";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allowed HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const assetItems = await prismaClient.assetItems.findMany({
        where: id ? { id: Number(id) } : undefined,
        select: {
          id: true,
          assetHeaderId: true,
          duty: true,
          specification: true,
          valveType: true,
          valveSize: true,
          model: true,
          actuation: true,
          actuationType: true,
          flangeConnection: true,
          instrumentation: true,
          oemPartNumber: true,
          ansi: true,
          generalNotes: true,
          images: true,
          assetHeader: {
            select: {
              id: true,
              assetNumber: true,
            },
          },
        },
      });

      res.status(200).json(assetItems);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default allowCors(handler);
