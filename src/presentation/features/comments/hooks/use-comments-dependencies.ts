import { useMemo } from 'react';
import { container } from 'tsyringe';

import {
  CommentRepository,
  CreateCommentDto,
  PatchCommentDto,
  UpdateCommentDto,
} from '@domain/comment';
import type { IValidatorEntity } from '@domain/shared';

export const useCommentsDependencies = () => {
  return useMemo(
    () => ({
      comments: container.resolve<CommentRepository>(CommentRepository.TOKEN),
      validators: {
        create: container.resolve<IValidatorEntity<CreateCommentDto>>(
          CreateCommentDto.VALIDATOR_TOKEN,
        ),
        update: container.resolve<IValidatorEntity<UpdateCommentDto>>(
          UpdateCommentDto.VALIDATOR_TOKEN,
        ),
        patch: container.resolve<IValidatorEntity<PatchCommentDto>>(
          PatchCommentDto.VALIDATOR_TOKEN,
        ),
      },
    }),
    [],
  );
};
