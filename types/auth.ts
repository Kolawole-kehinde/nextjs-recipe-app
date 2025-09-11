
export interface User {
  id: string;
  name: string;
  email: string;
  gender?: string;  
  role?: "user" | "admin"; 
  avatar?: string;   
  created_at?: string; 
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
