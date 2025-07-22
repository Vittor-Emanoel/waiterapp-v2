import { ApplicationError } from "@/errors/application/ApplicationError";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ApplicationError) {
    return reply.status(error.statusCode ?? 500).send({
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  if (error instanceof ZodError) {
    const errors = error.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));

    return reply.status(400).send({
      code: "BAD_REQUEST",
      message: "Validation error",
      errors,
      statusCode: 400,
    });
  }

  return reply.status(500).send({
    code: "INTERNAL_SERVER_ERROR",
    message: "internal server error",
    statusCode: 500,
  });
}
