export interface ITodoEntity {
  id: number;
  idUser: number;
  title: string;
  completed: boolean;
}

export class TodoEntity {
  static readonly TOKEN = Symbol('TodoEntity.Validator');

  readonly id!: number;
  readonly idUser!: number;
  readonly title!: string;
  readonly completed!: boolean;

  constructor(props: ITodoEntity) {
    Object.assign(this, props);
  }
}
