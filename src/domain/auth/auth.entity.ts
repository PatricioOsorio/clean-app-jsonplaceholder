export type IRoles = 'admin' | 'user' | 'guest';
export type IPermissions = 'read' | 'write' | 'delete' | 'manage_roles';

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
