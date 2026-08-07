export interface IPhotoEntity {
  id: number;
  idAlbum: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export class PhotoEntity {
  static readonly TOKEN = Symbol('PhotoEntity.Validator');

  readonly id!: number;
  readonly idAlbum!: number;
  readonly title!: string;
  readonly url!: string;
  readonly thumbnailUrl!: string;

  constructor(props: IPhotoEntity) {
    Object.assign(this, props);
  }
}
