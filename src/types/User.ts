import {Role} from "./Role";
import {ActivityData} from "./App";

export type User = {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  username: string;
  email?: string;
  corporateEmail: string;
  createdAt: Date;
  updatedAt: Date;
  birthDate?: Date;
  Role: Role
};

type NewUserD = {
  name: string;
  lastname: string;
  dni: string;
  username: string;
  email?: string;
  corporateEmail: string;
  birthDate ?: number;
  roleId ?: number;
  password: string
}

export type NewUserFormData = NewUserD & {
  reason: string
}

export type NewUserData = ActivityData<NewUserD>

export type LoginData = {
  email: string;
  password: string;
};

export type PostLoginData = {
  code: string;
};

export type PasswordRecoveryRequestData = {
  email: string;
};

export type PasswordRecoveryValidationData = {
  userId: number;
  token: string;
};

export type PasswordRecoveryProceedData = {
  userId: number;
  token: string;
  password: string;
  passwordRepeat: string;
};
