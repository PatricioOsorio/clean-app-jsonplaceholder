import type { ICreateTodoProps } from './create-todo';

export type IUpdateTodoProps = ICreateTodoProps;

export class UpdateTodoDto implements IUpdateTodoProps {
  static readonly VALIDATOR_TOKEN = Symbol('UpdateTodoDto.Validator');

  readonly idUser!: number;
  readonly title!: string;
  readonly completed!: boolean;

  private constructor(props: IUpdateTodoProps) {
    Object.assign(this, { completed: false, ...props });
  }

  static create(data: IUpdateTodoProps): UpdateTodoDto {
    return new UpdateTodoDto(data);
  }
}
