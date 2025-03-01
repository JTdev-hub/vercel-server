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
};

export default allowCors(handler);
