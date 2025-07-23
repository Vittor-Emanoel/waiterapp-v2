import "@fastify/jwt";
import { UserType } from "@prisma/client";

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
