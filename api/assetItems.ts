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

      const itemCount = await prismaClient.assetItems.count({
        where: {
          assetHeaderId: {
            equals: assetHeaderId,
          },
        },
      });

      const newItemId = itemCount + 1;

      const newAssetItems = await prismaClient.assetItems.create({
        data: {
          id: newItemId,
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

      const assetItems = await prismaClient.assetItems.findUnique({
        where: {
          id_assetHeaderId: {
            id: Number(newItemId),
            assetHeaderId: Number(assetHeaderId),
          },
        },
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
  } else if (req.method === "PATCH") {
    try {
      const { id, assetHeaderId } = req.query;

      console.log(req.body);

      const updatedAssetItems = await prismaClient.assetItems.update({
        where: {
          id_assetHeaderId: {
            id: Number(id),
            assetHeaderId: Number(assetHeaderId),
          },
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
