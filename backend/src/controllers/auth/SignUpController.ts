
import { makeRegisterUseCase } from "@/factories/auth/auth.factory";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignUpController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = schema.parse(request.body);
    const registerUseCase = makeRegisterUseCase();

    try {
      const { user } = await registerUseCase.execute({
        email,
        name,
        password,
        role: "ADMIN",
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
