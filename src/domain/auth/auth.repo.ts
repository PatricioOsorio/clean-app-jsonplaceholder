import type { AuthEntity, ForgotPasswordDto, LoginDto, RegisterDto } from '@domain/auth';

export abstract class AuthRepository {
  static readonly TOKEN = Symbol('AuthRepository');

  abstract login(loginDto: LoginDto): Promise<AuthEntity>;
  abstract logout(): Promise<void>;
  abstract getCurrentUser(): Promise<AuthEntity | null>;
  abstract register(registerDto: RegisterDto): Promise<AuthEntity>;
  abstract forgotPassword(email: ForgotPasswordDto): Promise<void>;
}
