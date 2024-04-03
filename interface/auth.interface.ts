export interface RegisterBody {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface JWTPayload {
  id: string;
}

export interface LoginBody {
  identifier: string
  password: string
}