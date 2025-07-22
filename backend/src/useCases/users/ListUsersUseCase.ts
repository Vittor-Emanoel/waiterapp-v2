import { IUsersRepository } from "@/repositories/IUsersRepository";

export class ListUsersUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute() {
    const users = await this.usersRepository.getAll();

    return { users };
  }
}
