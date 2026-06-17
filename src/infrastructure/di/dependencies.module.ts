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
      posts: {
        create: new CreatePostUseCase(postRepo),
        delete: new DeletePostUseCase(postRepo),
        getOne: new GetPostUseCase(postRepo),
        getAll: new GetPostsUseCase(postRepo),
        patch: new PatchPostUseCase(postRepo),
        update: new UpdatePostUseCase(postRepo),
      },
    } satisfies IDependencies;
  },
});

export { container };
