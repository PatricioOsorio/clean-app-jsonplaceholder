import type { CommentEntity } from '@domain/comment';
import type { ICommentVM } from '@presentation/features/comments/models';

export abstract class CommentMapper {
  static toVM(entity: CommentEntity): ICommentVM {
    return {
      id: entity.id,
      idPost: entity.idPost,
      name: entity.name,
      email: entity.email,
      body: entity.content,
    };
  }

  static toVMs(entities: CommentEntity[]): ICommentVM[] {
    return entities.map((entity) => this.toVM(entity));
  }
}
