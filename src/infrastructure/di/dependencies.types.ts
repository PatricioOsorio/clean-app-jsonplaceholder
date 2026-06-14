import {
  CreatePostUseCase,
  DeletePostUseCase,
  GetPostUseCase,
  GetPostsUseCase,
  PatchPostUseCase,
  UpdatePostUseCase,
} from '@domain/post/use-cases';

export const DEPENDENCIES_TOKEN = Symbol('IDependencies');

export interface IDependencies {
  createPostUseCase: CreatePostUseCase;
  deletePostUseCase: DeletePostUseCase;
  getPostUseCase: GetPostUseCase;
  getPostsUseCase: GetPostsUseCase;
  patchPostUseCase: PatchPostUseCase;
  updatePostUseCase: UpdatePostUseCase;
}
