import type { UserEntity } from '@domain/user';
import type { IUserVM } from './user.vm';

export abstract class UserMapper {
  static toVM(entity: UserEntity): IUserVM {
    return {
      id: entity.id,
      name: entity.name,
      userName: entity.userName,
      email: entity.email,
    };
  }

  static toVMs(entities: UserEntity[]): IUserVM[] {
    return entities.map((entity) => this.toVM(entity));
  }
}
