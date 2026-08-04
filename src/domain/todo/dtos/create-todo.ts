export type ICreateTodoProps = {
  idUser: number;
  title: string;
  completed?: boolean;
};

export class CreateTodoDto implements ICreateTodoProps {
  static readonly VALIDATOR_TOKEN = Symbol('CreateTodoDto.Validator');

  readonly idUser!: number;
  readonly title!: string;
  readonly completed!: boolean;

  private constructor(props: ICreateTodoProps) {
    Object.assign(this, { completed: false, ...props });
  }

  static create(data: ICreateTodoProps): CreateTodoDto {
    return new CreateTodoDto(data);
  }
}
