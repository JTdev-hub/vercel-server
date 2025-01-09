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
};

export default allowCors(handler);
