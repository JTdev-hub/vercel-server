import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";
import allowCors from "./allowCors";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  // res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, DELETE, OPTIONS"
  // ); // Allowed HTTP methods
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const customers = await prismaClient.customers.findMany({
        where: id ? { id: Number(id) } : undefined,
      });

      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { customerName, customerSite, customerContact } = req.body;
      const newCustomer = await prismaClient.customers.create({
        data: { customerName, customerSite, customerContact },
      });
      res.status(200).json(newCustomer);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

export default allowCors(handler);
