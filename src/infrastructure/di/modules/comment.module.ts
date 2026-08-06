import type { ClassProvider } from 'tsyringe';

import {
  CommentRepository,
  CreateCommentDto,
  PatchCommentDto,
  UpdateCommentDto,
  CommentEntity,
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
  ZodCommentEntityValidator,
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
    entity: ZodCommentEntityValidator,
  },
};

container.register(CommentRepository.TOKEN, { useClass: COMMENT_REPOSITORIES[DATA_SOURCE] });

container.register(CreateCommentDto.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].create,
});

container.register(UpdateCommentDto.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].update,
});

container.register(PatchCommentDto.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].patch,
});

container.register(CommentEntity.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].entity,
});

export { container };
