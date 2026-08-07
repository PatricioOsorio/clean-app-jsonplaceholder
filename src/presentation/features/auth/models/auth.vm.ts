import type { IPermissions, IRoles } from '@domain/auth';

export type IRolesVM = IRoles;
export type IPermissionsVM = IPermissions;

export interface IAuthVM {
  id: number;
  userName: string;
  email: string;
  createdAt: Date;

  roles?: IRolesVM[];
  permissions?: IPermissionsVM[];

  hasPermission: (permission: IPermissionsVM[]) => boolean;
}
