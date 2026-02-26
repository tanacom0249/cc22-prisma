import prisma from "../src/prismaClient.js";
import { faker } from "@faker-js/faker";

async function main() {
  //await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: [
      {
        name: "keyboard",
        price: 2500,
        stock: 20,
      },
      {
        name: "mouse",
        price: 100,
        stock: 3,
      },
    ],
  });

  await prisma.product.createMany({
    data: Array.from({ length: 10 }).map(() => ({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      stock: faker.number.int({ min: 10, max: 60 }),
    })),
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
