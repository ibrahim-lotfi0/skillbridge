import "server-only";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use standard PrismaClient without Driver Adapter for maximum local stability
let prismaInstance: any;

try {
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
} catch (e) {
  console.warn("Prisma failed to initialize. Using mock proxy.");
  prismaInstance = new Proxy({}, {
    get: () => () => ({
      findMany: async () => [],
      findUnique: async () => null,
      findFirst: async () => null,
      create: async () => ({}),
      update: async () => ({}),
      delete: async () => ({}),
    })
  });
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
