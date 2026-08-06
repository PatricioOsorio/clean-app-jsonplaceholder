import type { IValidatorEntity } from '@domain/shared';
import { CreateUserDto, PatchUserDto, UpdateUserDto, UserRepository } from '@domain/user';
import { useMemo } from 'react';
import { container } from 'tsyringe';

export const useUsersDependencies = () => {
  return useMemo(
    () => ({
      users: container.resolve<UserRepository>(UserRepository.TOKEN),
      validators: {
        create: container.resolve<IValidatorEntity<CreateUserDto>>(CreateUserDto.TOKEN),
        update: container.resolve<IValidatorEntity<UpdateUserDto>>(UpdateUserDto.TOKEN),
        patch: container.resolve<IValidatorEntity<PatchUserDto>>(PatchUserDto.TOKEN),
      },
    }),
    [],
  );
};
