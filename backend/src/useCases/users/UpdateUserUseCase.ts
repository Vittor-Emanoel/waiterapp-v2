import { EmailAlreadyInUseError } from "@/errors/application/EmailAlreadyInUse";
import { UserNotFoundError } from "@/errors/application/UserNotFound";
import type { IUsersRepository } from "@/repositories/IUsersRepository";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

export interface IUpdateUserRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "WAITER" | "ADMIN";
}

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id, name, email, password, role }: IUpdateUserRequest) {
    try {
      const user = await this.usersRepository.findById(id);

      if (email !== user?.email) {
        throw new EmailAlreadyInUseError();
      }

      const hashedPassword = await hash(password, 12);

      await this.usersRepository.update(id, {
        name,
        email,
        password: hashedPassword,
        type: role,
      });
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
