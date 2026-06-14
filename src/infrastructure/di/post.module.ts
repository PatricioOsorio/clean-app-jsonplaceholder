import { container } from 'tsyringe';
import type { ClassProvider } from 'tsyringe';

import { PostRepositoryApi, PostRepositoryMock, PostRepositoryLocal } from '@infrastructure/post';
import { PostRepository } from '@domain/post';
import { ENV } from '@infrastructure/utils';

type PostRepositoryCtor = ClassProvider<PostRepository>['useClass'];

const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

const REPOSITORIES: Record<typeof DATA_SOURCE, PostRepositoryCtor> = {
  api: PostRepositoryApi,
  mock: PostRepositoryMock,
  localstorage: PostRepositoryLocal,
};

container.register(PostRepository.TOKEN, {
  useClass: REPOSITORIES[DATA_SOURCE],
});

export { container };
