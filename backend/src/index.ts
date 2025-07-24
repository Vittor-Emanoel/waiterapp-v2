import "dotenv/config";

import FastifyJWT from "@fastify/jwt";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUI from "@fastify/swagger-ui";
import Fastify from "fastify";

import FastifySocketIO from "fastify-socket.io";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/ErrorHandler";
import { adminRoutes, privateRoutes, publicRoutes } from "./routes";

const fastify = Fastify();

// Configuração do Swagger
fastify.register(FastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      description: "Documentação da API do sistema",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      { name: "Public", description: "Rotas públicas" },
      { name: "Private", description: "Rotas privadas (requer autenticação)" },
      { name: "Admin", description: "Rotas administrativas" },
    ],
  },
});

// Configuração da UI do Swagger
fastify.register(FastifySwaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

fastify.register(FastifySocketIO, {
  preClose: (done) => {
    fastify.io.local.disconnectSockets(true);
    done();
  },
});

fastify.register(FastifyJWT, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "7d",
  },
});

fastify.setErrorHandler(errorHandler);

// Registrar as rotas
fastify.register(publicRoutes);
fastify.register(privateRoutes);
fastify.register(adminRoutes);

fastify.listen({ port: 3000 }).then(() => {
  console.log("> Server is now listening on http://localhost:3000");
  console.log(
    "> Swagger documentation available at http://localhost:3000/docs",
  );
});
