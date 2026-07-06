import type { IGetQueryParams } from '@domain/shared';
import type { UserEntity } from '@domain/user';

export type IGetUsersParams = IGetQueryParams<UserEntity>;
