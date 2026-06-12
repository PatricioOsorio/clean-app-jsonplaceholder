import { container } from 'tsyringe';

import { DEPENDENCIES_TOKEN } from './dependencies.types';
import type { IDependencies } from './dependencies.types';

import { CreatePostUseCase } from '@domain/post/use-cases/create-post.use-case';
import { DeletePostUseCase } from '@domain/post/use-cases/delete-post.use-case';
import { GetPostUseCase } from '@domain/post/use-cases/get-post.use-case';
import { GetPostsUseCase } from '@domain/post/use-cases/get-posts.use-case';
import { PatchPostUseCase } from '@domain/post/use-cases/patch-post.use-case';
import { UpdatePostUseCase } from '@domain/post/use-cases/update-post.use-case';

container.register(DEPENDENCIES_TOKEN, {
  useFactory: (c) =>
    ({
      createPostUseCase: c.resolve(CreatePostUseCase),
      deletePostUseCase: c.resolve(DeletePostUseCase),
      getPostUseCase: c.resolve(GetPostUseCase),
      getPostsUseCase: c.resolve(GetPostsUseCase),
      patchPostUseCase: c.resolve(PatchPostUseCase),
      updatePostUseCase: c.resolve(UpdatePostUseCase),
    }) satisfies IDependencies,
});

export { container };
