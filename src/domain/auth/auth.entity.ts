export type IRoles = 'admin' | 'user' | 'guest';
export type IPermissions =
  | 'posts:read'
  | 'posts:create'
  | 'posts:update'
  | 'posts:delete'
  | 'comments:read'
  | 'comments:create'
  | 'comments:update'
  | 'comments:delete'
  | 'users:manage';

export class AuthEntity {
  static readonly VALIDATOR_TOKEN = Symbol('AuthEntity.Validator');

  constructor(
    public id: number,
    public userName: string,
    public email: string,
    public roles: IRoles[],
    public permissions: IPermissions[],
    public createdAt: Date,
  ) {}
}
