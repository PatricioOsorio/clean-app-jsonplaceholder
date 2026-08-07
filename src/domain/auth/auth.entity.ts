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

export interface IAuthEntity {
  id: number;
  userName: string;
  email: string;
  roles: IRoles[];
  permissions: IPermissions[];
  createdAt: Date;
}

export class AuthEntity {
  static readonly TOKEN = Symbol('AuthEntity.Validator');

  readonly id!: number;
  readonly userName!: string;
  readonly email!: string;
  readonly roles!: IRoles[];
  readonly permissions!: IPermissions[];
  readonly createdAt!: Date;

  constructor(props: IAuthEntity) {
    Object.assign(this, props);
  }

  public hasPermission(permissions: IPermissions[]): boolean {
    if (this.roles.includes('admin')) {
      return true;
    }
    return this.permissions.some((p) => permissions.includes(p));
  }
}
