import { useMemo } from 'react';
import { container } from 'tsyringe';

import { PostRepository, CreatePostDto, UpdatePostDto, PatchPostDto } from '@domain/post';
import type { IValidatorEntity } from '@domain/shared';

export const usePostsDependencies = () => {
  return useMemo(
    () => ({
      posts: container.resolve<PostRepository>(PostRepository.TOKEN),
      validators: {
        create: container.resolve<IValidatorEntity<CreatePostDto>>(CreatePostDto.TOKEN),
        update: container.resolve<IValidatorEntity<UpdatePostDto>>(UpdatePostDto.TOKEN),
        patch: container.resolve<IValidatorEntity<PatchPostDto>>(PatchPostDto.TOKEN),
      },
    }),
    [],
  );
};
