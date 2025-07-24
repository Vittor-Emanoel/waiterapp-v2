import {
  CreateUserDTO,
  UpdateUserDTO,
  UserResponseDTO,
} from "@/dtos/users/users-dto";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import type { IUsersRepository } from "../IUsersRepository";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: CreateUserDTO) {
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

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
  async update(userId: string, data: UpdateUserDTO): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async getAll(): Promise<UserResponseDTO[]> {
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
  async delete(userId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: userId },
    });
  }
}
