import {
  CreatePostUseCase,
  DeletePostUseCase,
  GetPostUseCase,
  GetPostsUseCase,
  PatchPostUseCase,
  UpdatePostUseCase,
} from '@domain/post/use-cases';

export const DEPENDENCIES_TOKEN = Symbol('IDependencies');

export interface IPostDependencies {
  create: CreatePostUseCase;
  delete: DeletePostUseCase;
  getOne: GetPostUseCase;
  getAll: GetPostsUseCase;
  patch: PatchPostUseCase;
  update: UpdatePostUseCase;
}

export interface IDependencies {
  posts: IPostDependencies;
}
