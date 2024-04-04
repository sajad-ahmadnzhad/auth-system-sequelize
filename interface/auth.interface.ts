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

export interface UserAttributes extends Omit<RegisterBody, 'confirmPassword'> {
  id: number
  refreshToken: string
  isAdmin: boolean
  isSuperAdmin: boolean
  profile: string
}