import { prisma } from "@/lib/prisma";
import { IRefreshTokenRepository } from "../IRefreshTokenRepository";

export interface RefreshTokenDTO {
  id: string;
  userId: string;
  issuedAt: Date;
  expiresAt: Date;
}

export class PrismaRefreshTokenRepository implements IRefreshTokenRepository {
  async findById(id: string): Promise<RefreshTokenDTO | null> {
    return prisma.refreshToken.findUnique({
      where: { id },
    });
  }

  async create(data: {
    userId: string;
    expiresAt: Date;
  }): Promise<RefreshTokenDTO> {
    const token = await prisma.refreshToken.create({
      data: {
        userId: data.userId,
        expiresAt: data.expiresAt,
      },
    });

    return token;
  }

  async delete(id: string): Promise<void> {
    await prisma.refreshToken.delete({ where: { id } });
  }
}
