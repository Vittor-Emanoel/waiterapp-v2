import { AccessDeniedError } from "@/errors/application/AccessDenied";
import { FastifyReply, FastifyRequest } from "fastify";

export async function AuthorizationMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user;
  if (!user || user.role !== "ADMIN") {
    throw new AccessDeniedError();
  }
}
