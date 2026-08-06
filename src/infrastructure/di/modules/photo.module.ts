import { container, type ClassProvider } from 'tsyringe';

import {
  CreatePhotoDto,
  PatchPhotoDto,
  PhotoEntity,
  PhotoRepository,
  UpdatePhotoDto,
} from '@domain/photo';
import { ENV } from '@infrastructure/utils';
import {
  PhotoRepositoryApi,
  PhotoRepositoryLocal,
  PhotoRepositoryMock,
  ZodCreatePhotoValidator,
  ZodPatchPhotoValidator,
  ZodPhotoEntityValidator,
  ZodUpdatePhotoValidator,
} from '@infrastructure/photo';

const VALIDATOR_PROVIDER = 'zod';
const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

type IPhotoRepositoryCtor = ClassProvider<PhotoRepository>['useClass'];

const PHOTO_REPOSITORIES: Record<typeof DATA_SOURCE, IPhotoRepositoryCtor> = {
  api: PhotoRepositoryApi,
  mock: PhotoRepositoryMock,
  localstorage: PhotoRepositoryLocal,
};

const VALIDATORS_REPOSITORIES = {
  zod: {
    create: ZodCreatePhotoValidator,
    update: ZodUpdatePhotoValidator,
    patch: ZodPatchPhotoValidator,
    entity: ZodPhotoEntityValidator,
  },
};

container.register(PhotoRepository.TOKEN, { useClass: PHOTO_REPOSITORIES[DATA_SOURCE] });

container.register(CreatePhotoDto.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].create,
});

container.register(UpdatePhotoDto.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].update,
});

container.register(PatchPhotoDto.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].patch,
});

container.register(PhotoEntity.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].entity,
});

export { container };
