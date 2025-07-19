import { ApplicationError } from '@/errors/application/ApplicationError';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';


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


  return reply.status(500).send({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'internal server error',
    statusCode: 500,
  });
}
