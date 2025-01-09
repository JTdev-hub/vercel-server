import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const assetAndCustomers = await prismaClient.customers.findMany({
        include: {
          assetHeaders: true,
        },
      });
      res.status(200).json(assetAndCustomers);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
