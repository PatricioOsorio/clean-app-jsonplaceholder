import { container } from 'tsyringe';

import { DEPENDENCIES_TOKEN } from './dependencies.types';
import type { IDependencies } from './dependencies.types';

import {
  PostRepository,
  CreatePostUseCase,
  DeletePostUseCase,
  GetPostUseCase,
  GetPostsUseCase,
  PatchPostUseCase,
  UpdatePostUseCase,
} from '@domain/post';

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
