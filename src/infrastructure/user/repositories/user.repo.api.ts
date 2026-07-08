import { inject, injectable } from 'tsyringe';

import { DomainError } from '@domain/errors';
import { HttpRepository, type IHttpResponse } from '@domain/http';
import {
  CreateUserDto,
  PatchUserDto,
  UpdateUserDto,
  UserEntity,
  UserNotFoundError,
  UserRepository,
  type IGetUsersParams,
} from '@domain/user';
import { createApiErrorHandler } from '@infrastructure/http';
import type { IPaginatedResult } from '@domain/shared';
import { UserMapper, type IUserResponse } from '@infrastructure/user';

const userErrorHandler = createApiErrorHandler((error, userId) => {
  if (error.gatewayCode !== 'NOT_FOUND') {
    return;
  }

  if (userId !== undefined) {
    return new UserNotFoundError(Number(userId));
  }

  return new DomainError('Load Failed', 'Could not load users from server.', 'NOT_FOUND');
});

@injectable()
export class UserRepositoryApi implements UserRepository {
  constructor(@inject(HttpRepository.TOKEN) private readonly httpClient: HttpRepository) {}

  private handleError(error: unknown, userId?: number): never {
    return userErrorHandler(error, userId);
  }

  private toPaginatedResult<TResponse, TEntity>(
    response: IHttpResponse<TResponse[]>,
    mapper: (response: TResponse[]) => TEntity[],
  ): IPaginatedResult<TEntity> {
    const headerCount = response.headers?.['x-total-count'];
    const dataCount = Array.isArray(response.data) ? response.data.length : 0;

    const total = Number(headerCount ?? dataCount ?? 0);
    const entities = mapper(response.data);

    return {
      data: entities,
      total,
    };
  }

  async getAll(params?: IGetUsersParams): Promise<IPaginatedResult<UserEntity>> {
    try {
      const queryParams = UserMapper.toQueryParams(params);

      const response = await this.httpClient.get<IUserResponse[]>('/users', {
        params: queryParams,
      });

      return this.toPaginatedResult<IUserResponse, UserEntity>(response, (responses) =>
        UserMapper.toEntities(responses),
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async getById(id: number): Promise<UserEntity> {
    try {
      const response = await this.httpClient.get<IUserResponse>(`/users/${id}`);

      return UserMapper.toEntity(response.data);
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    try {
      const queryParams = new URLSearchParams({ email });

      const response = await this.httpClient.get<IUserResponse[]>('/users', {
        params: queryParams,
      });

      const user = response.data[0] ?? null;

      if (!user) return null;

      return UserMapper.toEntity(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    try {
      const response = await this.httpClient.post<IUserResponse>(
        '/users',
        UserMapper.toResponse(user),
      );
      return UserMapper.toEntity(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, user: UpdateUserDto): Promise<UserEntity> {
    try {
      const response = await this.httpClient.put<IUserResponse>(
        `/users/${id}`,
        UserMapper.toResponse(user),
      );

      return UserMapper.toEntity(response.data);
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async patch(id: number, fields: PatchUserDto): Promise<UserEntity> {
    try {
      const response = await this.httpClient.patch<IUserResponse>(
        `/users/${id}`,
        UserMapper.toResponse(fields),
      );

      return UserMapper.toEntity(response.data);
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.httpClient.delete(`/users/${id}`);
      return true;
    } catch (error) {
      this.handleError(error, id);
    }
  }
}
