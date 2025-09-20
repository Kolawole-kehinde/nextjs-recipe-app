
export interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  gender?: string | null;
}


// 🔹 Payloads
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

export interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}
