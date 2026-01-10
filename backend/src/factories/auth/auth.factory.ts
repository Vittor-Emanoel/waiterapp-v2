import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaRefreshTokenRepository } from "@/repositories/prisma/prisma.refresh-token-repository";
import { AuthenticateUseCase } from "@/useCases/auth/AuthenticateUseCase";
import { RefreshTokenUseCase } from "@/useCases/auth/RefreshTokenUseCase";
import { RegisterUserUseCase } from "@/useCases/auth/RegisterUserUseCase";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUserUseCase(usersRepository);

  return registerUseCase;
}

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}

export function makeRefreshTokenUseCase() {
  const refreshTokenRepository = new PrismaRefreshTokenRepository();
  const refreshTokenUseCase = new RefreshTokenUseCase(refreshTokenRepository);

  return refreshTokenUseCase;
}
