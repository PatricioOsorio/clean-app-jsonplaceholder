export class AlbumEntity {
  static readonly VALIDATOR_TOKEN = Symbol('AlbumEntity.Validator');

  constructor(
    public id: number,
    public idUser: number,
    public title: string,
  ) {}
}
