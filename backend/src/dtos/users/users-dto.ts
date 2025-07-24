import { UserType } from "@prisma/client";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export interface UserResponseDTO {
  name: string;
  email: string;
  type: UserType;
  created_at: Date;
}

export type UpdateUserDTO = Partial<CreateUserDTO>;
