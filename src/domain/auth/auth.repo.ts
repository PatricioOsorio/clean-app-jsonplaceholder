import type { AuthEntity, LoginDto } from '@domain/auth';

export abstract class AuthRepository {
  static readonly TOKEN = Symbol('AuthRepository');

  abstract login(loginDto: LoginDto): Promise<AuthEntity>;
  abstract logout(): Promise<void>;
  abstract getCurrentUser(): Promise<AuthEntity | null>;
}
