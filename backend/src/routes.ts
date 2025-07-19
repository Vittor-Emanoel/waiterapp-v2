import { type FastifyInstance } from "fastify";

import { signin } from "./http/controllers/auth/signin";
import { signup } from "./http/controllers/auth/signup";
import { createCategory } from "./http/controllers/category/create-category";
import { deleteOneCategory } from "./http/controllers/category/delete-one-category";
import { listCategory } from "./http/controllers/category/list-category";
import { updateCategory } from "./http/controllers/category/update-category";
import { createIngredient } from "./http/controllers/ingredient/create-ingredient";
import { deleteOneIngredient } from "./http/controllers/ingredient/delete-one-ingredient";
import { listIngredient } from "./http/controllers/ingredient/list-ingredient";
import { updateIngredient } from "./http/controllers/ingredient/update-ingredient";
import { createProduct } from "./http/controllers/product/create-product";
import { deleteProduct } from "./http/controllers/product/delete-product";
import { listProducts } from "./http/controllers/product/list-product";
import { updateProduct } from "./http/controllers/product/update-product";
import { authMiddleware } from "./middlewares/authMiddleware";

export async function publicRoutes(fastify: FastifyInstance) {
  fastify.post("/signup", signup);
  fastify.post("/signin", signin);
}

export async function privateRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", authMiddleware);

  //##region categories
  fastify.get("/categories", listCategory);
  fastify.post("/categories", createCategory);
  fastify.put("/categories/:categoryId", updateCategory);
  fastify.delete("/categories/:categoryId", deleteOneCategory);

  //##region ingredients
  fastify.get("/ingredients", listIngredient);
  fastify.post("/ingredients", createIngredient);
  fastify.put("/ingredients/:ingredientId", updateIngredient);
  fastify.delete("/ingredients/:ingredientId", deleteOneIngredient);

  //##region products
  fastify.get("/products", listProducts);
  fastify.post("/products", createProduct);
  fastify.put("/products/:productId", updateProduct);
  fastify.delete("/products/:productId", deleteProduct);
}
