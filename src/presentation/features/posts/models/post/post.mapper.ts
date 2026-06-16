import type { ICreatePostInput, IPost } from '@domain/post';
import type { IPostCreateVM, IPostUpdateVM, IPostVM } from './post.mv';

export abstract class PostMapper {
  static toVM(entity: IPost): IPostVM {
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      idUser: entity.idUser,
    };
  }

  static toVMs(entities: IPost[]): IPostVM[] {
    return entities.map((entity) => this.toVM(entity));
  }
  static toDomain(vm: Partial<IPostVM>): Partial<IPost> {
    const domain: Partial<IPost> = {};

    if (vm.id !== undefined) domain.id = vm.id;
    if (vm.idUser !== undefined) domain.idUser = vm.idUser;
    if (vm.title !== undefined) domain.title = vm.title;
    if (vm.content !== undefined) domain.content = vm.content;

    return domain;
  }

  static toCreatePostDomain(vm: IPostCreateVM): ICreatePostInput {
    return {
      title: vm.title,
      content: vm.content,
      idUser: vm.idUser,
    };
  }

  static toUpdatePostDomain(vm: IPostUpdateVM): Partial<IPost> {
    const domain: Partial<IPost> = {};

    if (vm.id !== undefined) domain.id = vm.id;
    if (vm.idUser !== undefined) domain.idUser = vm.idUser;
    if (vm.title !== undefined) domain.title = vm.title;
    if (vm.content !== undefined) domain.content = vm.content;

    return domain;
  }
}
