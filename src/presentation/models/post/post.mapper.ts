import type { IPost } from '@domain/post/post.entity';
import type { IPostMV } from './post.mv';

export abstract class PostMapper {
  static toVM(dto: IPost): IPostMV {
    return {
      id: dto.id,
      title: dto.title,
      content: dto.content,
      idUser: dto.idUser,
    };
  }

  static toVMs(dtos: IPost[]): IPostMV[] {
    return dtos.map((dto) => this.toVM(dto));
  }

  static toDomain(vm: Partial<IPostMV>): Partial<IPost> {
    const domain: Partial<IPost> = {};

    if (vm.id !== undefined) domain.id = vm.id;
    if (vm.idUser !== undefined) domain.idUser = vm.idUser;
    if (vm.title !== undefined) domain.title = vm.title;
    if (vm.content !== undefined) domain.content = vm.content;

    return domain;
  }
}
