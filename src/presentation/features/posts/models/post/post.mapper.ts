import type { ICreatePostInput, IPost } from '@domain/post';
import type { IPostCreateVM, IPostVM } from './post.mv';

// Optimistic posts use Date.now() as a temporary id; real ids are small integers.
const TEMP_ID_THRESHOLD = 1_000_000_000_000;

export abstract class PostMapper {
  static toVM(dto: IPost): IPostVM {
    return {
      id: dto.id,
      title: dto.title,
      content: dto.content,
      idUser: dto.idUser,
      __optimistic: dto.id > TEMP_ID_THRESHOLD,
    };
  }

  static toVMs(dtos: IPost[]): IPostVM[] {
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
}
