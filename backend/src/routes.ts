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
import { CreateOrderController } from "./controllers/orders/CreateOrderController";
import { ListOrdersController } from "./controllers/orders/ListOrdersController";
import { UpdateOrderStatusController } from "./controllers/orders/UpdateOrderStatusController";
import { CreateProductController } from "./controllers/products/CreateProductController";
import { DeleteProductController } from "./controllers/products/DeleteProductController";
import { ListProductsController } from "./controllers/products/ListProductsController";
import { UpdateProductController } from "./controllers/products/UpdateProductController";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { ListUsersController } from "./controllers/users/ListUsersController";
import { UpdateUserController } from "./controllers/users/UpdateUserController";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { AuthorizationMiddleware } from "./middlewares/AuthorizationMiddleware";

export async function publicRoutes(fastify: FastifyInstance) {
  fastify.post("/signup", SignUpController.handler);
  fastify.post("/signin", SignInController.handler);
}

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", AuthMiddleware);
  fastify.addHook("onRequest", AuthorizationMiddleware);

  fastify.post("/users", CreateUserController.handler);
  fastify.get("/users", ListUsersController.handler);
  fastify.put("/users/:userId", UpdateUserController.handler);
  fastify.delete("/users/:userId", CreateUserController.handler);
}

export async function privateRoutes(fastify: FastifyInstance) {
  fastify.addHook("onRequest", AuthMiddleware);

  //## region categories
  fastify.get("/categories", ListCategoriesController.handler);
  fastify.post("/categories", CreateCategoryController.handler);
  fastify.put("/categories/:categoryId", UpdateCategoryController.handler);
  fastify.delete("/categories/:categoryId", DeleteCategoryController.handler);
  //#endregion

  //## region ingredients
  fastify.get("/ingredients", ListIngredientsController.handler);
  fastify.post("/ingredients", CreateIngredientController.handler);
  fastify.put("/ingredients/:ingredientId", UpdateIngredientController.handler);
  fastify.delete(
    "/ingredients/:ingredientId",
    DeleteIngredientController.handler
  );
  //#endregion

  //## region products
  fastify.get("/products", ListProductsController.handler);
  fastify.post("/products", CreateProductController.handler);
  fastify.put("/products/:productId", UpdateProductController.handler);
  fastify.delete("/products/:productId", DeleteProductController.handler);
  //#endregion

  //## region orders
  fastify.post("/orders", CreateOrderController.handler);
  fastify.get("/orders", ListOrdersController.handler);
  fastify.patch("/orders/:orderId/status", UpdateOrderStatusController.handler);
  //#endregion
}
