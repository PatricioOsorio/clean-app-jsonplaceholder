import { container } from 'tsyringe';

import { DEPENDENCIES_TOKEN } from './dependencies.types';
import type { IDependencies } from './dependencies.types';

import {
  PostRepository,
  POST_VALIDATOR_TOKENS,
  CreatePostUseCase,
  DeletePostUseCase,
  GetPostUseCase,
  GetPostsUseCase,
  PatchPostUseCase,
  UpdatePostUseCase,
} from '@domain/post';
import type { ValidatorEntity } from '@domain/shared';
import type { ICreatePostInput, IPatchPostInput, IUpdatePostInput } from '@domain/post';

container.register(DEPENDENCIES_TOKEN, {
  useFactory: (c) => {
    const postRepo = c.resolve<PostRepository>(PostRepository.TOKEN);
    const createValidator = c.resolve<ValidatorEntity<ICreatePostInput>>(POST_VALIDATOR_TOKENS.CREATE);
    const updateValidator = c.resolve<ValidatorEntity<IUpdatePostInput>>(POST_VALIDATOR_TOKENS.UPDATE);
    const patchValidator = c.resolve<ValidatorEntity<IPatchPostInput>>(POST_VALIDATOR_TOKENS.PATCH);

    return {
      posts: {
        create: new CreatePostUseCase(postRepo, createValidator),
        delete: new DeletePostUseCase(postRepo),
        getOne: new GetPostUseCase(postRepo),
        getAll: new GetPostsUseCase(postRepo),
        patch: new PatchPostUseCase(postRepo, patchValidator),
        update: new UpdatePostUseCase(postRepo, updateValidator),
      },
    } satisfies IDependencies;
  },
});

export { container };
