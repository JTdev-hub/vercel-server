import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";

import allowCors from "../helper/allowCors";

const handler = async (req: VercelRequest, res: VercelResponse) => {
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
  } else if (req.method === "PATCH") {
    try {
      const { id } = req.query;

      console.log(req.body);

      const updatedAssetItems = await prismaClient.assetItems.update({
        where: {
          id: Number(id),
        },
        data: {
          images: req.body,
        },
      });
      res.status(200).json(updatedAssetItems);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

export default allowCors(handler);
