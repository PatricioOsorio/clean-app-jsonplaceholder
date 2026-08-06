import { AlbumRepository, CreateAlbumDto, PatchAlbumDto, UpdateAlbumDto } from '@domain/album';
import type { IValidatorEntity } from '@domain/shared';
import { useMemo } from 'react';
import { container } from 'tsyringe';

export const useAlbumsDependencies = () => {
  return useMemo(
    () => ({
      albums: container.resolve<AlbumRepository>(AlbumRepository.TOKEN),
      validators: {
        create: container.resolve<IValidatorEntity<CreateAlbumDto>>(CreateAlbumDto.TOKEN),
        update: container.resolve<IValidatorEntity<UpdateAlbumDto>>(UpdateAlbumDto.TOKEN),
        patch: container.resolve<IValidatorEntity<PatchAlbumDto>>(PatchAlbumDto.TOKEN),
      },
    }),
    [],
  );
};
