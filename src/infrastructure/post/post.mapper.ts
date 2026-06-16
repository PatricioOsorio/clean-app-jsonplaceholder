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

  static toDTO(entity: Partial<IPost>): Partial<IPostDTO> {
    const dto: Partial<IPostDTO> = {};

    if (entity.id !== undefined) dto.id = entity.id;
    if (entity.idUser !== undefined) dto.userId = entity.idUser;
    if (entity.title !== undefined) dto.title = entity.title;
    if (entity.content !== undefined) dto.body = entity.content;

    return dto;
  }
}
