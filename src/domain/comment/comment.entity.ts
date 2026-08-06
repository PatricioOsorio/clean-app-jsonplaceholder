export class CommentEntity {
  static readonly TOKEN = Symbol('CommentEntity.Validator');

  constructor(
    public id: number,
    public idPost: number,
    public name: string,
    public email: string,
    public content: string,
  ) {}
}
