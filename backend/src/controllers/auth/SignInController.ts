
import { makeAuthenticateUseCase } from "@/factories/auth/auth.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignInController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = schema.parse(request.body);

    const authenticateUseCase = makeAuthenticateUseCase();

    try {
      const { user } = await authenticateUseCase.execute({
        email,
        password,
      });

      const accessToken = await reply.jwtSign({
        sub: user.id,
        role: user.type,
      });

      return reply.status(201).send({ accessToken });
    } catch (error) {
      throw error;
    }
  }
}
