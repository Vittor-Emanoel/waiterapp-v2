import { EXP_TIME_IN_DAYS } from "@/config/constants";
import { IRefreshTokenRepository } from "@/repositories/IRefreshTokenRepository";

type JwtSignFn = (payload: object, options?: object) => Promise<string>;

export class RefreshTokenUseCase {
  constructor(
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly jwtSign: JwtSignFn,
  ) {}

  async execute(tokenId: string) {
    const refreshToken = await this.refreshTokenRepository.findById(tokenId);

    if (!refreshToken) {
      throw new Error("Invalid refresh token.");
    }

    if (Date.now() > refreshToken.expiresAt.getTime()) {
      throw new Error("Expired refresh token.");
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

    const [accessToken, newRefreshToken] = await Promise.all([
      this.jwtSign({ sub: refreshToken.userId }),

      this.refreshTokenRepository.create({
        userId: refreshToken.userId,
        expiresAt,
      }),

      this.refreshTokenRepository.delete(refreshToken.id),
    ]);

    return {
      accessToken,
      refreshToken: newRefreshToken.id,
    };
  }
}
