import {
  CreateUserDTO,
  UpdateUserDTO,
  UserResponseDTO,
} from "@/dtos/users/users-dto";
import type { User } from "@prisma/client";

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>;
  getAll(): Promise<UserResponseDTO[]>;
  update(userId: string, data: UpdateUserDTO): Promise<void>;
  delete(userId: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
}
