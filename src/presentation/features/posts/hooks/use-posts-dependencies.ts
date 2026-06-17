import { useMemo } from 'react';
import { container } from 'tsyringe';
import { PostRepository, CreatePostDto, UpdatePostDto, PatchPostDto } from '@domain/post';
import type { ValidatorEntity } from '@domain/shared';
import type { ICreatePostInput, IUpdatePostInput, IPatchPostInput } from '@domain/post';

export const usePostsDependencies = () => {
  return useMemo(() => ({
    posts: container.resolve<PostRepository>(PostRepository.TOKEN),
    validators: {
      create: container.resolve<ValidatorEntity<ICreatePostInput>>(CreatePostDto.VALIDATOR_TOKEN),
      update: container.resolve<ValidatorEntity<IUpdatePostInput>>(UpdatePostDto.VALIDATOR_TOKEN),
      patch: container.resolve<ValidatorEntity<IPatchPostInput>>(PatchPostDto.VALIDATOR_TOKEN),
    },
  }), []);
};
