import {
  PhotoEntity,
  PhotoNotFoundError,
  type CreatePhotoDto,
  type IGetPhotosParams,
  type PatchPhotoDto,
  type PhotoRepository,
  type UpdatePhotoDto,
} from '@domain/photo';
import type { IPaginatedResult, IValidatorEntity } from '@domain/shared';
import { SEED_PHOTOS, simulateFaultPhoto } from '@infrastructure/photo/repositories/photo.dev';
import { LOCAL_STORAGE_KEYS, StorageClient } from '@infrastructure/storage';
import {
  applyPaginationAndSorting,
  LocalDb,
  runDataCommand,
  withDelay,
} from '@infrastructure/utils';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PhotoRepositoryLocal implements PhotoRepository {
  private readonly db: LocalDb<PhotoEntity>;

  constructor(
    @inject(StorageClient.TOKEN) private readonly storage: StorageClient,
    @inject(PhotoEntity.VALIDATOR_TOKEN) private readonly validator: IValidatorEntity<PhotoEntity>,
  ) {
    this.db = new LocalDb<PhotoEntity>(this.storage, LOCAL_STORAGE_KEYS.photos, SEED_PHOTOS);
  }

  async getAll(params?: IGetPhotosParams): Promise<IPaginatedResult<PhotoEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultPhoto('getAll');

    const allPhotos = this.db.getAll().map((photo) => this.validator.validate(photo));
    const total = allPhotos.length;

    const paginatedPhotos = applyPaginationAndSorting(allPhotos, params);

    const paginatedResult: IPaginatedResult<PhotoEntity> = {
      data: paginatedPhotos,
      total,
    };
    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<PhotoEntity> {
    await simulateFaultPhoto('getById', id);

    const photo = this.db.getById(id);
    if (!photo) throw new PhotoNotFoundError(id);

    return withDelay(this.validator.validate(photo));
  }

  async create(photo: CreatePhotoDto): Promise<PhotoEntity> {
    await simulateFaultPhoto('create');

    const newPhoto = this.db.create(photo);
    return withDelay(this.validator.validate(newPhoto));
  }

  async update(id: number, photo: UpdatePhotoDto): Promise<PhotoEntity> {
    await simulateFaultPhoto('update', id);

    const updated = this.db.update(id, photo);
    if (!updated) throw new PhotoNotFoundError(id);

    return withDelay(this.validator.validate(updated));
  }

  async patch(id: number, fields: PatchPhotoDto): Promise<PhotoEntity> {
    await simulateFaultPhoto('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new PhotoNotFoundError(id);

    return withDelay(this.validator.validate(patched));
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultPhoto('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new PhotoNotFoundError(id);

    return withDelay(true);
  }
}
