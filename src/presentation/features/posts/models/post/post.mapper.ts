import type { ICreatePostInput, IPostEntity } from '@domain/post';
import type { IPatchPostInputVM, IPostCreateInputVM, IPostUpdateInputVM, IPostVM } from './post.mv';

export abstract class PostMapper {
  static toVM(entity: IPostEntity): IPostVM {
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      idUser: entity.idUser,
    };
  }

  static toVMs(entities: IPostEntity[]): IPostVM[] {
    return entities.map((entity) => this.toVM(entity));
  }

  static toEntity(vm: Partial<IPostVM>): Partial<IPostEntity> {
    const entity: Partial<IPostEntity> = {};

    if (vm.id !== undefined) entity.id = vm.id;
    if (vm.idUser !== undefined) entity.idUser = vm.idUser;
    if (vm.title !== undefined) entity.title = vm.title;
    if (vm.content !== undefined) entity.content = vm.content;

    return entity;
  }

  static toCreatePostInputDomain(vm: IPostCreateInputVM): ICreatePostInput {
    return {
      title: vm.title,
      content: vm.content,
      idUser: vm.idUser,
    };
  }

  static toUpdatePostInputDomain(vm: IPostUpdateInputVM): Partial<IPostEntity> {
    const inputDomain: Partial<IPostEntity> = {};

    if (vm.id !== undefined) inputDomain.id = vm.id;
    if (vm.idUser !== undefined) inputDomain.idUser = vm.idUser;
    if (vm.title !== undefined) inputDomain.title = vm.title;
    if (vm.content !== undefined) inputDomain.content = vm.content;

    return inputDomain;
  }

  static toPatchPostInputDomain(vm: Partial<IPatchPostInputVM>): Partial<IPostEntity> {
    const inputDomain: Partial<IPostEntity> = {};

    if (vm.id !== undefined) inputDomain.id = vm.id;
    if (vm.idUser !== undefined) inputDomain.idUser = vm.idUser;
    if (vm.title !== undefined) inputDomain.title = vm.title;
    if (vm.content !== undefined) inputDomain.content = vm.content;

    return inputDomain;
  }
}
