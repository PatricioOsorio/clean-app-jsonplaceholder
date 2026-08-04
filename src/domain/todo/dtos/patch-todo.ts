import type { ICreateTodoProps } from './create-todo';

export type IPatchTodoProps = Partial<ICreateTodoProps>;

export class PatchTodoDto implements IPatchTodoProps {
  static readonly VALIDATOR_TOKEN = Symbol('PatchTodoDto.Validator');

  readonly idUser?: number;
  readonly title?: string;
  readonly completed?: boolean;

  private constructor(props: IPatchTodoProps) {
    Object.assign(this, props);
  }

  static create(data: IPatchTodoProps): PatchTodoDto {
    return new PatchTodoDto(data);
  }
}
