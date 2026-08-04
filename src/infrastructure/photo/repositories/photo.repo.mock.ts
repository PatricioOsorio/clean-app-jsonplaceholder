import {
  PhotoNotFoundError,
  type CreatePhotoDto,
  type IGetPhotosParams,
  type PatchPhotoDto,
  type PhotoEntity,
  type PhotoRepository,
  type UpdatePhotoDto,
} from '@domain/photo';
import type { IPaginatedResult } from '@domain/shared';
import { SEED_PHOTOS, simulateFaultPhoto } from '@infrastructure/photo/repositories/photo.dev';
import { applyPaginationAndSorting, InMemoryDb, runDataCommand } from '@infrastructure/utils';
import { withDelay } from '@infrastructure/utils/delay';
import { injectable } from 'tsyringe';

@injectable()
export class PhotoRepositoryMock implements PhotoRepository {
  private readonly db = new InMemoryDb<PhotoEntity>(SEED_PHOTOS);

  async getAll(params?: IGetPhotosParams): Promise<IPaginatedResult<PhotoEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultPhoto('getAll');

    const allPhotos = this.db.getAll();
    const total = allPhotos.length;

    const sortedPaginatedPhotos = applyPaginationAndSorting(allPhotos, params);

    const paginatedResult: IPaginatedResult<PhotoEntity> = {
      data: sortedPaginatedPhotos,
      total,
    };

    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<PhotoEntity> {
    await simulateFaultPhoto('getById', id);

    const photo = this.db.getById(id);
    if (!photo) throw new PhotoNotFoundError(id);

    return withDelay(photo);
  }

  async create(photo: CreatePhotoDto): Promise<PhotoEntity> {
    await simulateFaultPhoto('create');
    const newPhoto = this.db.create(photo);
    return withDelay(newPhoto);
  }

  async update(id: number, photo: UpdatePhotoDto): Promise<PhotoEntity> {
    await simulateFaultPhoto('update', id);

    const updated = this.db.update(id, photo);
    if (!updated) throw new PhotoNotFoundError(id);

    return withDelay(updated);
  }

  async patch(id: number, fields: PatchPhotoDto): Promise<PhotoEntity> {
    await simulateFaultPhoto('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new PhotoNotFoundError(id);

    return withDelay(patched);
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultPhoto('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new PhotoNotFoundError(id);

    return withDelay(true);
  }
}
