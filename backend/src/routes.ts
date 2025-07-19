import { type FastifyInstance } from "fastify";

import { SignInController } from "./controllers/auth/SignInController";
import { SignUpController } from "./controllers/auth/SignUpController";
import { CreateCategoryController } from "./controllers/categories/CreateCategoryController";
import { ListCategoriesController } from "./controllers/categories/ListCategoriesController";
import { UpdateCategoryController } from "./controllers/categories/UpdateCategoryController";
import { deleteOneCategory } from "./http/controllers/category/delete-one-category";
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
  fastify.post("/signup", SignUpController.handler);
  fastify.post("/signin", SignInController.handler);
}

export async function privateRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", authMiddleware);

  //##region categories
  fastify.get("/categories", ListCategoriesController.handler);
  fastify.post("/categories", CreateCategoryController.handler);
  fastify.put("/categories/:categoryId", UpdateCategoryController.handler);
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
