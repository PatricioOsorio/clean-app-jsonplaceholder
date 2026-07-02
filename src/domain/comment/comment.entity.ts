export class CommentEntity {
  constructor(
    public id: number,
    public idPost: number,
    public name: string,
    public email: string,
    public content: string,
  ) {}
}
