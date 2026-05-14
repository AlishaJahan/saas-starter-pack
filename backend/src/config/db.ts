import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('🐘 PostgreSQL Connected (Prisma)');
  } catch (error: any) {
    console.error(`❌ Prisma Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export { prisma, connectDB };
