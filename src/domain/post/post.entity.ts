export class PostEntity {
  constructor(
    public id: number,
    public idUser: number,
    public title: string,
    public content: string,
  ) {}
}
