import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const assetItems = await prismaClient.assetItems.findMany({});

      res.status(200).json(assetItems);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const {
        assetHeaderId,
        duty,
        specification,
        valveType,
        valveSize,
        model,
        actuation,
        actuationType,
        flangeConnection,
        instrumentation,
        oemPartNumber,
        ansi,
        generalNotes,
        images,
      } = req.body;

      const newAssetItems = await prismaClient.assetItems.create({
        data: {
          assetHeaderId,
          duty,
          specification,
          valveType,
          valveSize,
          model,
          actuation,
          actuationType,
          flangeConnection,
          instrumentation,
          oemPartNumber,
          ansi,
          generalNotes,
          images,
        },
      });
      res.status(200).json(newAssetItems);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
