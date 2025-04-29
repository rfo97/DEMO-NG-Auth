export interface AuthRequest {
  email: string;
  password: string;
  name?: string;
  image?: string;
}

export interface AuthResponse {
  token: string;
  id?: number;
}
