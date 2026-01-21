import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as TanStackQueryProvider from "./providers/react-query.tsx";
import { loginRouter, rootRouter } from "./route.ts";

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();

const routeTree = rootRouter.addChildren([loginRouter]);

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
      <RouterProvider router={router} />
    </TanStackQueryProvider.Provider>
  </StrictMode>,
);
