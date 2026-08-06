import { CreatePhotoDto, PatchPhotoDto, PhotoRepository, UpdatePhotoDto } from '@domain/photo';
import type { IValidatorEntity } from '@domain/shared';
import { useMemo } from 'react';
import { container } from 'tsyringe';

export const usePhotosDependencies = () => {
  return useMemo(
    () => ({
      photos: container.resolve<PhotoRepository>(PhotoRepository.TOKEN),
      validators: {
        create: container.resolve<IValidatorEntity<CreatePhotoDto>>(CreatePhotoDto.TOKEN),
        update: container.resolve<IValidatorEntity<UpdatePhotoDto>>(UpdatePhotoDto.TOKEN),
        patch: container.resolve<IValidatorEntity<PatchPhotoDto>>(PatchPhotoDto.TOKEN),
      },
    }),
    [],
  );
};
