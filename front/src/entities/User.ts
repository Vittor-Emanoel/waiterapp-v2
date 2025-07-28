export type UserType = "WAITER" | "ADMIN";

export interface User {
  name: string;
  email: string;
  password: string;
  type: UserType;
  created_at: Date;
}
