import { RefreshTokenDTO } from "./prisma/prisma.refresh-token-repository";

export interface IRefreshTokenRepository {
  findById(id: string): Promise<RefreshTokenDTO | null>;
  create(data: { userId: string; expiresAt: Date }): Promise<RefreshTokenDTO>;
  delete(id: string): Promise<void>;
}
