import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";
import allowCors from "../helper/allowCors";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  // res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, DELETE, OPTIONS"
  // ); // Allowed HTTP methods
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "GET") {
    try {
      const { id, dataQuery } = req.query;
      const customers = await prismaClient.customers.findMany({
        where: {
          AND: [
            id ? { id: Number(id) } : {}, // Include `id` filter only if it's provided
            {
              OR: dataQuery
                ? [
                    {
                      customerName: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                    {
                      customerSite: {
                        contains: dataQuery as string,
                        mode: "insensitive",
                      },
                    },
                  ]
                : undefined, // Include `OR` filter only if `customerQuery` is provided
            },
          ],
        },
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
