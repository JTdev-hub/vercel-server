import type { VercelRequest, VercelResponse } from "@vercel/node";
import prismaClient from "../prisma/prismaInstance";
import allowCors from "../helper/allowCors";

interface Customer {
  customerName: string;
  customerContact: string;
  customerSite: string;
}

const handler = async (req: VercelRequest, res: VercelResponse) => {
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
      const customers: Customer[] = req.body;
      const newCustomers = await Promise.all(
        customers.map(({ customerName, customerSite, customerContact }) =>
          prismaClient.customers.create({
            data: { customerName, customerSite, customerContact },
          })
        )
      );
      res.status(200).json(newCustomers);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

export default allowCors(handler);
