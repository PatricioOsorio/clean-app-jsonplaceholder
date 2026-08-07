import { AuthRepository, LoginDto, RegisterDto } from '@domain/auth';
import type { IValidatorEntity } from '@domain/shared';
import { useMemo } from 'react';
import { container } from 'tsyringe';

export const useAuthDependencies = () => {
  return useMemo(
    () => ({
      auth: container.resolve<AuthRepository>(AuthRepository.TOKEN),
      validators: {
        login: container.resolve<IValidatorEntity<LoginDto>>(LoginDto.TOKEN),
        register: container.resolve<IValidatorEntity<RegisterDto>>(RegisterDto.TOKEN),
      },
    }),
    [],
  );
};
