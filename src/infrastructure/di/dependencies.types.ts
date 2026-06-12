import { CreatePostUseCase } from '@domain/post/use-cases/create-post.use-case';
import { DeletePostUseCase } from '@domain/post/use-cases/delete-post.use-case';
import { GetPostsUseCase } from '@domain/post/use-cases/get-posts.use-case';
import { GetPostUseCase } from '@domain/post/use-cases/get-post.use-case';
import { PatchPostUseCase } from '@domain/post/use-cases/patch-post.use-case';
import { UpdatePostUseCase } from '@domain/post/use-cases/update-post.use-case';

export const DEPENDENCIES_TOKEN = Symbol('IDependencies');

export interface IDependencies {
  createPostUseCase: CreatePostUseCase;
  deletePostUseCase: DeletePostUseCase;
  getPostUseCase: GetPostUseCase;
  getPostsUseCase: GetPostsUseCase;
  patchPostUseCase: PatchPostUseCase;
  updatePostUseCase: UpdatePostUseCase;
}
