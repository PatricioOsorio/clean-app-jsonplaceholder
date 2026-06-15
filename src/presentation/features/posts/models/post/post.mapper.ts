import type { ICreatePostInput, IPost } from '@domain/post';
import type { IPostCreateVM, IPostUpdateVM, IPostVM, IPostCacheEntry } from './post.mv';

export abstract class PostMapper {
  static toVM(dto: IPostCacheEntry): IPostVM {
    return {
      id: dto.id,
      title: dto.title,
      content: dto.content,
      idUser: dto.idUser,
      __optimistic: dto.__optimistic,
    };
  }

  static toVMs(dtos: IPostCacheEntry[]): IPostVM[] {
    return dtos.map((dto) => this.toVM(dto));
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
