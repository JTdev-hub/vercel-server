import { PrismaClient, Prisma } from "@prisma/client";

// Initialize the Prisma Client with log options
const prismaClient = new PrismaClient({
  // log: ["query"] as Prisma.LogLevel[], // Type the log as Prisma.LogLevel[]
});

export default prismaClient;
