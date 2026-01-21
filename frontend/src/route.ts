import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Login } from "./pages/login";

export const rootRouter = createRootRoute();

export const loginRouter = createRoute({
  getParentRoute: () => rootRouter,
  component: Login,
  path: "/",
});
