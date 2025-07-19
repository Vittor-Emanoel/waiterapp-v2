import type { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(userId: string, data: Prisma.UserUpdateInput): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Omit<User, "password">[]>;
}
