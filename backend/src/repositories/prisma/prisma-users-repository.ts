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
  async update(data: Prisma.UserUpdateArgs): Promise<User> {
    const user = await prisma.user.update(data)
    return user
  }
}
