import { EmailAlreadyInUseError } from "@/errors/application/EmailAlreadyInUse";
import { makeRegisterUseCase } from "@/factories/auth/auth.factory";
import { UserType } from "@prisma/client";

import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.nativeEnum(UserType).default(UserType.WAITER),
  });

  const { name, email, password, role } = createUserBodySchema.parse(request.body);
  const registerUseCase = makeRegisterUseCase();

  try {
    const { user } = await registerUseCase.execute({
      email,
      name,
      password,
      role,
    });

    const accessToken = await reply.jwtSign({ sub: user.id, role: user.type });

    return reply.status(201).send({ accessToken });
  } catch (error) {
    if (error instanceof EmailAlreadyInUseError) {
      return reply.status(409).send({
        code: error.code,
        message: error.message,
        statusCode: error.statusCode ?? 400,
      });
    }

    throw error;
  }
}
