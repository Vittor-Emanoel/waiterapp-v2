import { UserNotFoundError } from "@/errors/UserNotFoundError";
import type { IUsersRepository } from "@/repositories/IUsersRepository";
import { Prisma } from "@prisma/client";

export class DeleteUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(userId: string) {
    try {
      await this.userRepository.delete(userId);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new UserNotFoundError();
      }

      throw error;
    }
  }
}
