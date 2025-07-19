import { EmailAlreadyInUseError } from "@/errors/application/EmailAlreadyInUse";
import type { IUsersRepository } from "@/repositories/IUsersRepository";
import { hash } from "bcryptjs";

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "WAITER" | "ADMIN";
}

export class RegisterUserUseCase {
  constructor(private authRepository: IUsersRepository) {}

  async execute({ name, email, password, role }: IRegisterRequest) {
    const emailTaken = await this.authRepository.findByEmail(email);

    if (emailTaken) {
      throw new EmailAlreadyInUseError();
    }

    const passwordHashed = await hash(password, 12);

    const user = await this.authRepository.create({
      name,
      email,
      password: passwordHashed,
      type: role,
    });

    return {
      user,
    };
  }
}
