import { prisma } from "@/lib/prisma";
import type { Prisma, User } from "@prisma/client";
import type { IUsersRepository } from "../IUsersRepository";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  async update(userId: string, data: Prisma.UserUpdateInput): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async getAll(): Promise<Omit<User, "password">[]> {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        type: true,
      },
    });
    return user;
  }
  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
