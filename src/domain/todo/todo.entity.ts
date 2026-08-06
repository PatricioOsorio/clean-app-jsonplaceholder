export class TodoEntity {
  static readonly TOKEN = Symbol('TodoEntity.Validator');

  constructor(
    public id: number,
    public idUser: number,
    public title: string,
    public completed: boolean,
  ) {}
}
