import { CreateTodoDto, type ICreateTodoProps } from './create-todo';

export class UpdateTodoDto extends CreateTodoDto {
  override static readonly VALIDATOR_TOKEN = Symbol('UpdateTodoDto.Validator');

  static override create(data: ICreateTodoProps): UpdateTodoDto {
    return new UpdateTodoDto(data);
  }
}
