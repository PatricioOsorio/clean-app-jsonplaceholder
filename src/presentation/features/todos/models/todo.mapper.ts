import type { TodoEntity } from '@domain/todo';
import { type ITodoVM } from './todo.vm';

export abstract class TodoMapper {
  static toVM(entity: TodoEntity): ITodoVM {
    return {
      id: entity.id,
      title: entity.title,
      isCompleted: entity.completed,
    };
  }

  static toVMs(entities: TodoEntity[]): ITodoVM[] {
    return entities.map((entity) => this.toVM(entity));
  }
}
