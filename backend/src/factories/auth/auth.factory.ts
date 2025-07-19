import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/useCases/auth/authenticate";
import { RegisterUseCase } from "@/useCases/auth/register";

export function makeRegisterUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const registerUseCase = new RegisterUseCase(usersRepository);

	return registerUseCase;
}

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}

