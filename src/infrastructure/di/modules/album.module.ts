import { container, type ClassProvider } from 'tsyringe';

import {
  AlbumEntity,
  AlbumRepository,
  CreateAlbumDto,
  PatchAlbumDto,
  UpdateAlbumDto,
} from '@domain/album';
import { ENV } from '@infrastructure/utils';
import {
  AlbumRepositoryApi,
  AlbumRepositoryLocal,
  AlbumRepositoryMock,
  ZodCreateAlbumValidator,
  ZodEntityAlbumValidator,
  ZodPatchAlbumValidator,
  ZodUpdateAlbumValidator,
} from '@infrastructure/album';

const VALIDATOR_PROVIDER = 'zod';
const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

type IAlbumRepositoryCtor = ClassProvider<AlbumRepository>['useClass'];

const ALBUM_REPOSITORIES: Record<typeof DATA_SOURCE, IAlbumRepositoryCtor> = {
  api: AlbumRepositoryApi,
  mock: AlbumRepositoryMock,
  localstorage: AlbumRepositoryLocal,
};

const VALIDATORS_REPOSITORIES = {
  zod: {
    create: ZodCreateAlbumValidator,
    update: ZodUpdateAlbumValidator,
    patch: ZodPatchAlbumValidator,
    entity: ZodEntityAlbumValidator,
  },
};

container.register(AlbumRepository.TOKEN, { useClass: ALBUM_REPOSITORIES[DATA_SOURCE] });

container.register(CreateAlbumDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].create,
});

container.register(UpdateAlbumDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].update,
});

container.register(PatchAlbumDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].patch,
});

container.register(AlbumEntity.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].entity,
});
