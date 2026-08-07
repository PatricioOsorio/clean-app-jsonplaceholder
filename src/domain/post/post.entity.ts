export interface IPostEntity {
  id: number;
  idUser: number;
  title: string;
  content: string;
}

export class PostEntity {
  static readonly TOKEN = Symbol('PostEntity.Validator');

  readonly id!: number;
  readonly idUser!: number;
  readonly title!: string;
  readonly content!: string;

  constructor(props: IPostEntity) {
    Object.assign(this, props);
  }
}
