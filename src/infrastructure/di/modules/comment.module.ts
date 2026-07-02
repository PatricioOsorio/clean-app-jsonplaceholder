import type { ClassProvider } from 'tsyringe';

import { CommentRepository } from '@domain/comment';
import { ENV } from '@infrastructure/utils';
import { container } from 'tsyringe';
import {
  CommentRepositoryApi,
  CommentRepositoryLocal,
  CommentRepositoryMock,
} from '@infrastructure/comment';

const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

type ICommentRepositoryCtor = ClassProvider<CommentRepository>['useClass'];

const COMMENT_REPOSITORIES: Record<typeof DATA_SOURCE, ICommentRepositoryCtor> = {
  api: CommentRepositoryApi,
  mock: CommentRepositoryMock,
  localstorage: CommentRepositoryLocal,
};

container.register(CommentRepository.TOKEN, { useClass: COMMENT_REPOSITORIES[DATA_SOURCE] });

export { container };
