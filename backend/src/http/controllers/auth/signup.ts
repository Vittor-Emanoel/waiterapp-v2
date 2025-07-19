import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { JwtService } from "@/services/JwtService";
import { makeRegisterUseCase } from "@/useCases/factories/auth/makeRegisterUseCase";

import { fastify, type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export async function signup(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    // role: z.nativeEnum(UserType).default(UserType.WAITER),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
  const registerUseCase = makeRegisterUseCase();

  try {
    const { user } = await registerUseCase.execute({
      email,
      name,
      password,
      role: "ADMIN",
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
