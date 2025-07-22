import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashed_password",
      type: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      name: "Waiter User",
      email: "waiter@example.com",
      password: "hashed_password",
      type: "WAITER",
    },
  });

  const pizzaCategory = await prisma.category.create({
    data: {
      name: "Pizza",
      emoji: "🍕",
    },
  });

  const drinkCategory = await prisma.category.create({
    data: {
      name: "Drink",
      emoji: "🥤",
    },
  });

  const cheese = await prisma.ingredient.create({
    data: {
      name: "Cheese",
      emoji: "🧀",
    },
  });

  const tomato = await prisma.ingredient.create({
    data: {
      name: "Tomato",
      emoji: "🍅",
    },
  });

  const margherita = await prisma.product.create({
    data: {
      name: "Margherita",
      description: "Classic pizza with cheese and tomato",
      price: 30.5,
      imageUrl: "https://example.com/margherita.jpg",
      categoryId: pizzaCategory.id,
      ingredients: {
        connect: [{ id: cheese.id }, { id: tomato.id }],
      },
    },
  });

  const coke = await prisma.product.create({
    data: {
      name: "Coca-Cola",
      description: "Refreshing soda",
      price: 7.5,
      imageUrl: "https://example.com/coca-cola.jpg",
      categoryId: drinkCategory.id,
      ingredients: {},
    },
  });

  const today = await prisma.day.create({
    data: {
      date: new Date(),
      active: true,
    },
  });

  await prisma.order.create({
    data: {
      table: 5,
      status: "WAITING",
      dayId: today.id,
      products: {
        create: [
          {
            productId: margherita.id,
            quantity: 2,
          },
          {
            productId: coke.id,
            quantity: 1,
          },
        ],
      },
    },
  });

  console.log("Seed finalizado!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
