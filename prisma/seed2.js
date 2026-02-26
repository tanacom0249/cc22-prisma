import prisma from "../src/prismaClient.js";
import { faker } from "@faker-js/faker";

async function main() {
  await prisma.product.createMany({
    data: Array.from({ length: 20 }).map(() => ({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      stock: faker.number.int({ min: 0, max: 100 }),
    })),
  });

  await prisma.user.createMany({
    data: Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 10, max: 60 }),
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
