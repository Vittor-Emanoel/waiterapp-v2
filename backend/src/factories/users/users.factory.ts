import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ListUsersUseCase } from "@/useCases/users/ListUsersUseCase";
import { UpdateUserUseCase } from "@/useCases/users/UpdateUserUseCase";

export function makeListUsersUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const listUsersUseCase = new ListUsersUseCase(usersRepository);

  return listUsersUseCase;
}

export function makeUpdateUsersUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);

  return updateUserUseCase;
}

export function makeDeleteUsersUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);

  return updateUserUseCase;
}
