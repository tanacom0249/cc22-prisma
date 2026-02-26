import prisma from "./prismaClient.js";
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Api");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });
  res.json(user);
});

app.post("/users", async (req, res) => {
  const { email, name, age } = req.body;
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      age,
    },
  });
  res.json({
    message: "Created",
    newUser,
  });
});

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

app.get("/products/count", async (req, res) => {
  const count = await prisma.product.count();
  res.json({ count });
});

app.get("/products/detail", async (req, res) => {
  const result = await prisma.product.aggregate({
    _sum: {
      price: true,
      stock: true,
    },
    _avg: {
      price: true,
      stock: true,
    },
    _count: {
      _all: true,
    },
    _max: {
      price: true,
    },
    _min: {
      price: true,
    },
  });

  const cheapProducts = await prisma.product.findMany({
    where: {
      name: {
        contains: "wood",
      },
      price: {
        lte: 2000,
        gte: 100,
      },
      stock: {
        lte: 50,
      },
    },
  });

  res.json({ cheapProducts, result });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
