import { container } from 'tsyringe';
import type { ClassProvider } from 'tsyringe';

import {
  PostRepositoryApi,
  PostRepositoryMock,
  PostRepositoryLocal,
  ZodCreatePostValidator,
  ZodUpdatePostValidator,
  ZodPatchPostValidator,
} from '@infrastructure/post';
import { PostRepository, POST_VALIDATOR_TOKENS } from '@domain/post';
import { ENV } from '@infrastructure/utils';

type PostRepositoryCtor = ClassProvider<PostRepository>['useClass'];

const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

const REPOSITORIES: Record<typeof DATA_SOURCE, PostRepositoryCtor> = {
  api: PostRepositoryApi,
  mock: PostRepositoryMock,
  localstorage: PostRepositoryLocal,
};

container.register(PostRepository.TOKEN, { useClass: REPOSITORIES[DATA_SOURCE] });
container.register(POST_VALIDATOR_TOKENS.CREATE, { useClass: ZodCreatePostValidator });
container.register(POST_VALIDATOR_TOKENS.UPDATE, { useClass: ZodUpdatePostValidator });
container.register(POST_VALIDATOR_TOKENS.PATCH, { useClass: ZodPatchPostValidator });

export { container };
