import { container } from 'tsyringe';
import type { ClassProvider } from 'tsyringe';

import {
  PostRepositoryApi,
  PostRepositoryMock,
  PostRepositoryLocal,
  ZodCreatePostValidator,
  ZodUpdatePostValidator,
  ZodPatchPostValidator,
  VanillaCreatePostValidator,
  VanillaUpdatePostValidator,
  VanillaPatchPostValidator,
} from '@infrastructure/post';
import { PostRepository, CreatePostDto, UpdatePostDto, PatchPostDto } from '@domain/post';
import { ENV } from '@infrastructure/utils';

const VALIDATOR_PROVIDER = 'zod';
const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

type IPostRepositoryCtor = ClassProvider<PostRepository>['useClass'];

const POST_REPOSITORIES: Record<typeof DATA_SOURCE, IPostRepositoryCtor> = {
  api: PostRepositoryApi,
  mock: PostRepositoryMock,
  localstorage: PostRepositoryLocal,
};

const VALIDATORS_REPOSITORIES = {
  zod: {
    create: ZodCreatePostValidator,
    update: ZodUpdatePostValidator,
    patch: ZodPatchPostValidator,
  },
  vanilla: {
    create: VanillaCreatePostValidator,
    update: VanillaUpdatePostValidator,
    patch: VanillaPatchPostValidator,
  },
};

container.register(PostRepository.TOKEN, { useClass: POST_REPOSITORIES[DATA_SOURCE] });

container.register(CreatePostDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].create,
});
container.register(UpdatePostDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].update,
});
container.register(PatchPostDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].patch,
});

export { container };
