import type { User } from "./user.types";

export type LoginFormData = Pick<User, "email" | "password"> & {
  confirmPassword: string;
};

export type RegisterFormData = Pick<User, "name" | "email" | "password"> & {
  confirmPassword: string;
};
