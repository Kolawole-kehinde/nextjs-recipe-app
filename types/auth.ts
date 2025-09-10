export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  gender: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}
