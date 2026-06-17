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
import type { ValidatorEntity } from '@domain/shared';
import type { ICreatePostInput, IPatchPostInput, IUpdatePostInput } from '@domain/post';

container.register(DEPENDENCIES_TOKEN, {
  useFactory: (c) => {
    const postRepo = c.resolve<PostRepository>(PostRepository.TOKEN);

    const createValidator = c.resolve<ValidatorEntity<ICreatePostInput>>(
      CreatePostUseCase.VALIDATOR_TOKEN,
    );
    const updateValidator = c.resolve<ValidatorEntity<IUpdatePostInput>>(
      UpdatePostUseCase.VALIDATOR_TOKEN,
    );
    const patchValidator = c.resolve<ValidatorEntity<IPatchPostInput>>(
      PatchPostUseCase.VALIDATOR_TOKEN,
    );

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
