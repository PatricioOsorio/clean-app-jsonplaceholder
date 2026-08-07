export interface ICommentEntity {
  id: number;
  idPost: number;
  name: string;
  email: string;
  content: string;
}

export class CommentEntity {
  static readonly TOKEN = Symbol('CommentEntity.Validator');

  readonly id!: number;
  readonly idPost!: number;
  readonly name!: string;
  readonly email!: string;
  readonly content!: string;

  constructor(props: ICommentEntity) {
    Object.assign(this, props);
  }
}
