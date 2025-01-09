import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
}
