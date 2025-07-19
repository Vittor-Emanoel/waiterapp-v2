import type { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(data: Prisma.UserUpdateArgs): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
