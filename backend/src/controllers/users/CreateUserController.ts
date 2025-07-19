import { makeRegisterUseCase } from "@/factories/auth/auth.factory";
import { UserType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(UserType).default(UserType.WAITER),
});

export class CreateUserController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, role } = schema.parse(request.body);
    const registerUseCase = makeRegisterUseCase();

    try {
      const { user } = await registerUseCase.execute({
        email,
        name,
        password,
        role,
      });

      return reply.status(201).send(user);
    } catch (error) {
      throw error;
    }
  }
}
