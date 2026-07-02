import type { PostEntity } from '@domain/post';
import type { IPostVM } from './post.mv';

export abstract class PostMapper {
  static toVM(entity: PostEntity): IPostVM {
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      idUser: entity.idUser,
    };
  }

  static toVMs(entities: PostEntity[]): IPostVM[] {
    return entities.map((entity) => this.toVM(entity));
  }

  static toEntity(vm: Partial<IPostVM>): Partial<PostEntity> {
    const entity: Partial<PostEntity> = {};

    if (vm.id !== undefined) entity.id = vm.id;
    if (vm.idUser !== undefined) entity.idUser = vm.idUser;
    if (vm.title !== undefined) entity.title = vm.title;
    if (vm.content !== undefined) entity.content = vm.content;

    return entity;
  }
}
