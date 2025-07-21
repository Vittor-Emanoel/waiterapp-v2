import type { FastifyReply, FastifyRequest } from "fastify";

export async function AuthMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch {
    return reply.code(401).send({ error: "Invalid token." });
  }
}
