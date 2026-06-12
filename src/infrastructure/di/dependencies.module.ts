import { container } from 'tsyringe';

import { DEPENDENCIES_TOKEN } from './dependencies.types';
import type { IDependencies } from './dependencies.types';

import { PostRepository } from '@domain/post/post.repo';
import { CreatePostUseCase } from '@domain/post/use-cases/create-post.use-case';
import { DeletePostUseCase } from '@domain/post/use-cases/delete-post.use-case';
import { GetPostUseCase } from '@domain/post/use-cases/get-post.use-case';
import { GetPostsUseCase } from '@domain/post/use-cases/get-posts.use-case';
import { PatchPostUseCase } from '@domain/post/use-cases/patch-post.use-case';
import { UpdatePostUseCase } from '@domain/post/use-cases/update-post.use-case';

container.register(DEPENDENCIES_TOKEN, {
  useFactory: (c) => {
    const postRepo = c.resolve<PostRepository>(PostRepository.TOKEN);

    return {
      createPostUseCase: new CreatePostUseCase(postRepo),
      deletePostUseCase: new DeletePostUseCase(postRepo),
      getPostUseCase: new GetPostUseCase(postRepo),
      getPostsUseCase: new GetPostsUseCase(postRepo),
      patchPostUseCase: new PatchPostUseCase(postRepo),
      updatePostUseCase: new UpdatePostUseCase(postRepo),
    } satisfies IDependencies;
  },
});

export { container };
