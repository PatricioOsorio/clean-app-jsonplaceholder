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

  static toEntity(vm: Partial<IPostVM>): Partial<IPost> {
    const entity: Partial<IPost> = {};

    if (vm.id !== undefined) entity.id = vm.id;
    if (vm.idUser !== undefined) entity.idUser = vm.idUser;
    if (vm.title !== undefined) entity.title = vm.title;
    if (vm.content !== undefined) entity.content = vm.content;

    return entity;
  }

  static toCreatePostInputDomain(vm: IPostCreateVM): ICreatePostInput {
    return {
      title: vm.title,
      content: vm.content,
      idUser: vm.idUser,
    };
  }

  static toUpdatePostInputDomain(vm: IPostUpdateVM): Partial<IPost> {
    const inputDomain: Partial<IPost> = {};

    if (vm.id !== undefined) inputDomain.id = vm.id;
    if (vm.idUser !== undefined) inputDomain.idUser = vm.idUser;
    if (vm.title !== undefined) inputDomain.title = vm.title;
    if (vm.content !== undefined) inputDomain.content = vm.content;

    return inputDomain;
  }
}
