import type { IPost } from '@domain/post/post.entity';
import type { IPostDTO } from './post.dto';

export abstract class PostMapper {
  static toEntity(dto: IPostDTO): IPost {
    return {
      id: dto.id,
      idUser: dto.userId,
      title: dto.title,
      content: dto.body,
    };
  }

  static toEntities(dtos: IPostDTO[]): IPost[] {
    return dtos.map((dto) => this.toEntity(dto));
  }

  static toDTO(domain: Partial<IPost>): Partial<IPostDTO> {
    const dto: Partial<IPostDTO> = {};

    if (domain.id !== undefined) dto.id = domain.id;
    if (domain.idUser !== undefined) dto.userId = domain.idUser;
    if (domain.title !== undefined) dto.title = domain.title;
    if (domain.content !== undefined) dto.body = domain.content;

    return dto;
  }
}
