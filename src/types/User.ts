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
  role: Role
};

export type NewUserData = {
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

export type Role = {
  id: string
  label: string
  description: string
}

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
