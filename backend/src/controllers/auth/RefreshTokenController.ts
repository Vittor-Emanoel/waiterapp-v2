import { PrismaRefreshTokenRepository } from "@/repositories/prisma/prisma.refresh-token-repository";
import { RefreshTokenUseCase } from "@/use-cases/refresh-token-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  refreshToken: z.string().uuid(),
});

export class RefreshTokenController {
  static async handler(request: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = schema.parse(request.body);

    const refreshTokenRepository = new PrismaRefreshTokenRepository();
    const useCase = new RefreshTokenUseCase(refreshTokenRepository);

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await useCase.execute(refreshToken);

      return reply.status(200).send({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      throw error;
    }
  }
}
