export interface IAlbumEntity {
  id: number;
  idUser: number;
  title: string;
}

export class AlbumEntity {
  static readonly TOKEN = Symbol('AlbumEntity.Validator');

  readonly id!: number;
  readonly idUser!: number;
  readonly title!: string;

  constructor(props: IAlbumEntity) {
    Object.assign(this, props);
  }
}
