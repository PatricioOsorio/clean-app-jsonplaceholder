import type { ClassProvider } from 'tsyringe';

import {
  CommentRepository,
  CreateCommentDto,
  PatchCommentDto,
  UpdateCommentDto,
} from '@domain/comment';
import { ENV } from '@infrastructure/utils';
import { container } from 'tsyringe';
import {
  CommentRepositoryApi,
  CommentRepositoryLocal,
  CommentRepositoryMock,
  ZodCreateCommentValidator,
  ZodPatchCommentValidator,
  ZodUpdateCommentValidator,
} from '@infrastructure/comment';

const VALIDATOR_PROVIDER = 'zod';
const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

type ICommentRepositoryCtor = ClassProvider<CommentRepository>['useClass'];

const COMMENT_REPOSITORIES: Record<typeof DATA_SOURCE, ICommentRepositoryCtor> = {
  api: CommentRepositoryApi,
  mock: CommentRepositoryMock,
  localstorage: CommentRepositoryLocal,
};

const VALIDATORS_REPOSITORIES = {
  zod: {
    create: ZodCreateCommentValidator,
    update: ZodUpdateCommentValidator,
    patch: ZodPatchCommentValidator,
  },
};

container.register(CommentRepository.TOKEN, { useClass: COMMENT_REPOSITORIES[DATA_SOURCE] });

container.register(CreateCommentDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].create,
});

container.register(UpdateCommentDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].update,
});

container.register(PatchCommentDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].patch,
});

export { container };
