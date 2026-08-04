export class PhotoEntity {
  static readonly VALIDATOR_TOKEN = Symbol('PhotoEntity.Validator');

  constructor(
    public id: number,
    public idAlbum: number,
    public title: string,
    public url: string,
    public thumbnailUrl: string,
  ) {}
}
