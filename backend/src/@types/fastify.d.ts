import "@fastify/jwt";
import { UserType } from "@prisma/client";
import { Server } from "socket.io";

interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
  role: UserType;
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: JwtPayload;
  }
}
declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}
