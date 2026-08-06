import { inject, injectable } from 'tsyringe';

import type { IPaginatedResult, IValidatorEntity } from '@domain/shared';
import {
  UserEntity,
  UserNotFoundError,
  type CreateUserDto,
  type IGetUsersParams,
  type PatchUserDto,
  type UpdateUserDto,
  type UserRepository,
} from '@domain/user';
import { LOCAL_STORAGE_KEYS, StorageClient } from '@infrastructure/storage';
import {
  applyPaginationAndSorting,
  LocalDb,
  runDataCommand,
  withDelay,
} from '@infrastructure/utils';
import { SEED_USER, simulateFaultUser } from './user.dev';
import { DomainError } from '@domain/errors';

@injectable()
export class UserRepositoryLocal implements UserRepository {
  private readonly db: LocalDb<UserEntity>;

  constructor(
    @inject(StorageClient.TOKEN) private readonly storage: StorageClient,
    @inject(UserEntity.TOKEN) private readonly validator: IValidatorEntity<UserEntity>,
  ) {
    this.db = new LocalDb<UserEntity>(this.storage, LOCAL_STORAGE_KEYS.users, SEED_USER);
  }

  async getAll(params?: IGetUsersParams): Promise<IPaginatedResult<UserEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultUser('getAll');

    const allUsers = this.db.getAll().map((user) => this.validator.validate(user));
    const total = allUsers.length;

    const paginatedUsers = applyPaginationAndSorting(allUsers, params);

    const paginatedResult: IPaginatedResult<UserEntity> = {
      data: paginatedUsers,
      total,
    };

    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<UserEntity> {
    await simulateFaultUser('getById', id);

    const user = this.db.getById(id);
    if (!user) throw new UserNotFoundError(id);

    return withDelay(this.validator.validate(user));
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    await simulateFaultUser('getByEmail');

    const user = this.db.getBy((u) => u.email === email)[0] || null;
    if (!user)
      throw new DomainError('User not found', `User with email ${email} not found`, 'NOT_FOUND');

    return withDelay(this.validator.validate(user));
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    await simulateFaultUser('create');

    const newUser = this.db.create(user);

    return withDelay(this.validator.validate(newUser));
  }

  async update(id: number, user: UpdateUserDto): Promise<UserEntity> {
    await simulateFaultUser('update', id);

    const updated = this.db.update(id, user);
    if (!updated) throw new UserNotFoundError(id);

    return withDelay(this.validator.validate(updated));
  }

  async patch(id: number, fields: PatchUserDto): Promise<UserEntity> {
    await simulateFaultUser('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new UserNotFoundError(id);

    return withDelay(this.validator.validate(patched));
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultUser('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new UserNotFoundError(id);

    return withDelay(true);
  }
}
