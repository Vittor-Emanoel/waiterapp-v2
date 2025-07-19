import { makeUpdateUsersUseCase } from "@/factories/users/users.factory";
import { UserType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(UserType).default(UserType.WAITER),
});

export class UpdateUserController {
  static async handler(
    request: FastifyRequest<{
      Params: {
        userId: string;
      };
    }>,
    reply: FastifyReply,
  ) {
    const { userId } = request.params;
    const { name, email, password, role } = schema.parse(request.body);

    const updateUserUseCase = makeUpdateUsersUseCase();

    try {
      await updateUserUseCase.execute({
        id: userId,
        name,
        email,
        password,
        role,
      });

      return reply.status(200).send();
    } catch (error) {
      throw error;
    }
  }
}
