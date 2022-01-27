import { PrismaClient } from "@prisma/client";
import dataSeed from "./seedData";

const prisma = new PrismaClient();

async function seeds() {
  await prisma.promotion.deleteMany();
  await prisma.user.deleteMany();

  dataSeed.forEach(async (obj) => {
    await prisma.user.create({
      data: {
        ...obj,
      },
    });
  });
}

seeds()
  .catch((e: any) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
