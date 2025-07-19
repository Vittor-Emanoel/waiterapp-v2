import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { makeRegisterUseCase } from "@/useCases/factories/auth/makeRegisterUseCase";
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
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
