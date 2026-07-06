import type { CreateUserDto, PatchUserDto, UpdateUserDto, UserEntity } from '@domain/user';
import type { IGetUsersParams } from './user.interfaces';
import type { IPaginatedResult } from '@domain/shared';

export abstract class UserRepository {
  static readonly TOKEN = Symbol('UserRepository');

  abstract getAll(params?: IGetUsersParams): Promise<IPaginatedResult<UserEntity>>;
  abstract getById(id: number): Promise<UserEntity>;
  abstract getByMail(mail: string): Promise<UserEntity | null>;
  abstract create(user: CreateUserDto): Promise<UserEntity>;
  abstract update(id: number, user: UpdateUserDto): Promise<UserEntity>;
  abstract patch(id: number, fields: PatchUserDto): Promise<UserEntity>;
  abstract delete(id: number): Promise<boolean>;
}
