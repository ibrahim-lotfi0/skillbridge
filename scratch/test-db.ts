import { PrismaClient } from "@prisma/client";

async function testConnection() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const prisma = new PrismaClient();
  try {
    console.log("Attempting to connect to database...");
    await prisma.$connect();
    console.log("Successfully connected to database.");
    const userCount = await prisma.user.count();
    console.log(`User count: ${userCount}`);
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
