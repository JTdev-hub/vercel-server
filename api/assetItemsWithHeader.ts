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
      const { id, assetHeaderId, dataQuery } = req.query;

      // If both id and assetHeaderId are provided, query using the composite unique key

      // If id and assetHeaderId are not provided, perform a general search
      const assetItems = await prismaClient.assetItems.findMany({
        where: {
          AND: [
            id ? { id: Number(id) } : {},
            assetHeaderId ? { assetHeaderId: Number(assetHeaderId) } : {},
            {
              OR: dataQuery
                ? [
                    {
                      assetHeader: {
                        assetNumber: {
                          contains: dataQuery as string,
                          mode: "insensitive",
                        },
                      },
                    },
                    {
                      duty: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      specification: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      valveType: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      valveSize: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      model: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      actuation: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      actuationType: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      flangeConnection: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      instrumentation: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      oemPartNumber: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      ansi: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                  ]
                : undefined,
            },
          ],
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
      console.error("Error in GET handler:", error);
      res.status(500).json({ message: "Internal server error.", error: error });
    }
  }
};
export default allowCors(handler);
