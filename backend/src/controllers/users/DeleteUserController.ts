import { makeListUsersUseCase } from "@/factories/users/users.factory";
import { FastifyReply, FastifyRequest } from "fastify";

export class DeleteUsersController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const listUsersUseCase = makeListUsersUseCase();

    try {
      const { users } = await listUsersUseCase.execute();

      return reply.status(200).send(users);
    } catch (error) {
      throw error;
    }
  }
}
