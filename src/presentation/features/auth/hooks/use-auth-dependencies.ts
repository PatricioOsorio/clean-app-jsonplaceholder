import { AuthRepository, LoginDto } from '@domain/auth';
import type { IValidatorEntity } from '@domain/shared';
import { useMemo } from 'react';
import { container } from 'tsyringe';

export const useAuthDependencies = () => {
  return useMemo(
    () => ({
      auth: container.resolve<AuthRepository>(AuthRepository.TOKEN),
      validators: {
        login: container.resolve<IValidatorEntity<LoginDto>>(LoginDto.VALIDATOR_TOKEN),
      },
    }),
    [],
  );
};
