import { injectable } from 'tsyringe';

import type { IPaginatedResult } from '@domain/shared';
import {
  UserNotFoundError,
  type CreateUserDto,
  type IGetUsersParams,
  type PatchUserDto,
  type UpdateUserDto,
  type UserEntity,
  type UserRepository,
} from '@domain/user';
import {
  applyPaginationAndSorting,
  InMemoryDb,
  runDataCommand,
  withDelay,
} from '@infrastructure/utils';
import { SEED_USER, simulateFaultUser } from './user.dev';
import { DomainError } from '@domain/errors/domain.error';

@injectable()
export class UserRepositoryMock implements UserRepository {
  private readonly db = new InMemoryDb<UserEntity>(SEED_USER);

  async getAll(params?: IGetUsersParams): Promise<IPaginatedResult<UserEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultUser('getAll');

    const allUsers = this.db.getAll();
    const total = allUsers.length;

    const sortedPaginatedUsers = applyPaginationAndSorting(allUsers, params);

    const paginatedResult: IPaginatedResult<UserEntity> = {
      data: sortedPaginatedUsers,
      total,
    };

    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<UserEntity> {
    await simulateFaultUser('getById', id);

    const user = this.db.getById(id);
    if (!user) throw new UserNotFoundError(id);

    return withDelay(user);
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    await simulateFaultUser('getByEmail');

    const user = this.db.getBy((u) => u.email === email)[0] || null;
    if (!user)
      throw new DomainError('User not found', `User with email ${email} not found`, 'NOT_FOUND');

    return withDelay(user);
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    await simulateFaultUser('create');

    const newUser = this.db.create(user);

    return withDelay(newUser);
  }

  async update(id: number, user: UpdateUserDto): Promise<UserEntity> {
    await simulateFaultUser('update', id);

    const updated = this.db.update(id, user);
    if (!updated) throw new UserNotFoundError(id);

    return withDelay(updated);
  }

  async patch(id: number, fields: PatchUserDto): Promise<UserEntity> {
    await simulateFaultUser('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new UserNotFoundError(id);

    return withDelay(patched);
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultUser('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new UserNotFoundError(id);

    return withDelay(true);
  }
}
