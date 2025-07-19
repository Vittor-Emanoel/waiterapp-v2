import { type FastifyInstance } from "fastify";

import { SignInController } from "./controllers/auth/SignInController";
import { SignUpController } from "./controllers/auth/SignUpController";
import { CreateCategoryController } from "./controllers/categories/CreateCategoryController";
import { ListCategoriesController } from "./controllers/categories/ListCategoriesController";
import { UpdateCategoryController } from "./controllers/categories/UpdateCategoryController";

import { DeleteCategoryController } from "./controllers/categories/DeleteCategoryController";
import { CreateIngredientController } from "./controllers/ingredients/CreateIngredientController";
import { DeleteIngredientController } from "./controllers/ingredients/DeleteIngredientController";
import { ListIngredientsController } from "./controllers/ingredients/ListIngredientsController";
import { UpdateIngredientController } from "./controllers/ingredients/UpdateIngredientController";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { ListUsersController } from "./controllers/users/ListUsersController";
import { UpdateUserController } from "./controllers/users/UpdateUserController";
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

  fastify.post("/users", CreateUserController.handler);
  fastify.get("/users", ListUsersController.handler);
  fastify.put("/users/:userId", UpdateUserController.handler);
  fastify.delete("/users/:userId", CreateUserController.handler);

  //##region categories
  fastify.get("/categories", ListCategoriesController.handler);
  fastify.post("/categories", CreateCategoryController.handler);
  fastify.put("/categories/:categoryId", UpdateCategoryController.handler);
  fastify.delete("/categories/:categoryId", DeleteCategoryController.handler);

  //##region ingredients
  fastify.get("/ingredients", ListIngredientsController.handler);
  fastify.post("/ingredients", CreateIngredientController.handler);
  fastify.put("/ingredients/:ingredientId", UpdateIngredientController.handler);
  fastify.delete(
    "/ingredients/:ingredientId",
    DeleteIngredientController.handler,
  );

  //##region products
  fastify.get("/products", listProducts);
  fastify.post("/products", createProduct);
  fastify.put("/products/:productId", updateProduct);
  fastify.delete("/products/:productId", deleteProduct);
}
