import "dotenv/config";

import FastifyJWT from "@fastify/jwt";
import Fastify from "fastify";

import { env } from "./config/env";
import { errorHandler } from "./middlewares/ErrorHandler";
import { privateRoutes, publicRoutes } from "./routes";

const fastify = Fastify();

fastify.register(FastifyJWT, {
	secret: env.JWT_SECRET,
	sign: {
		expiresIn: "7d",
	},
});
fastify.setErrorHandler(errorHandler);
fastify.register(publicRoutes);
fastify.register(privateRoutes);

fastify.listen({ port: 3000 }).then(() => {
	console.log("> Server is now listening on http://localhost:3000");
});
