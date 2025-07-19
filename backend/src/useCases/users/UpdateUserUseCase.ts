import { EmailAlreadyInUseError } from "@/errors/application/EmailAlreadyInUse";
import { UserNotFoundError } from "@/errors/UserNotFoundError";
import type { IUsersRepository } from "@/repositories/IUsersRepository";
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
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (email !== user.email) {
      const emailTaken = await this.usersRepository.findByEmail(email);
      if (emailTaken) {
        throw new EmailAlreadyInUseError();
      }
    }

    const hashedPassword = await hash(password, 12);

    await this.usersRepository.update(id, {
      name,
      email,
      password: hashedPassword,
      type: role,
    });
  }
}
