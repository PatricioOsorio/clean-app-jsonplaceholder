export class PostEntity {
  static readonly TOKEN = Symbol('PostEntity.Validator');

  constructor(
    public id: number,
    public idUser: number,
    public title: string,
    public content: string,
  ) {}
}
