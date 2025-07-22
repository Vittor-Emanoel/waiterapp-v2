import { UserNotFoundError } from "@/errors/application/UserNotFound";
import { IUsersRepository } from "@/repositories/IUsersRepository";
import { Prisma } from "@prisma/client";

export class DeleteUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(userId: string) {
    try {
      await this.usersRepository.delete(userId);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new UserNotFoundError();
      }
    }
  }
}
