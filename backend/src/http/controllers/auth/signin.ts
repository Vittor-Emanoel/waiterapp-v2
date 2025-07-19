import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { makeAuthenticateUseCase } from "@/useCases/factories/auth/makeAuthenticateUseCase";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);
  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const accessToken = await reply.jwtSign({ sub: user.id, role: user.type });

    return reply.status(201).send({ accessToken });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
