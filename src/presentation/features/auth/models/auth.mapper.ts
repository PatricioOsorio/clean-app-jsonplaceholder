import type { AuthEntity } from '@domain/auth';
import type { IAuthVM } from './auth.vm';

export abstract class AuthMapper {
  static toVM(entity: AuthEntity): IAuthVM {
    return {
      id: entity.id,
      email: entity.mail,
      createdAt: entity.createdAt,
      userName: entity.userName,
      roles: entity.roles,
      permissions: entity.permissions,
    };
  }

  static toVMs(entities: AuthEntity[]): IAuthVM[] {
    return entities.map((entity) => this.toVM(entity));
  }
}
