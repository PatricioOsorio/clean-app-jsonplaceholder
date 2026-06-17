import { useMemo } from 'react';
import { container } from 'tsyringe';
import { PostRepository, CreatePostDto, UpdatePostDto, PatchPostDto } from '@domain/post';
import type { IValidatorEntity } from '@domain/shared';
import type { ICreatePostInput, IUpdatePostInput, IPatchPostInput } from '@domain/post';

export const usePostsDependencies = () => {
  return useMemo(
    () => ({
      posts: container.resolve<PostRepository>(PostRepository.TOKEN),
      validators: {
        create: container.resolve<IValidatorEntity<ICreatePostInput>>(
          CreatePostDto.VALIDATOR_TOKEN,
        ),
        update: container.resolve<IValidatorEntity<IUpdatePostInput>>(
          UpdatePostDto.VALIDATOR_TOKEN,
        ),
        patch: container.resolve<IValidatorEntity<IPatchPostInput>>(PatchPostDto.VALIDATOR_TOKEN),
      },
    }),
    [],
  );
};
