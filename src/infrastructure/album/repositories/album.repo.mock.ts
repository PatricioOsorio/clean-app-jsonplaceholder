import {
  AlbumNotFoundError,
  type AlbumEntity,
  type AlbumRepository,
  type CreateAlbumDto,
  type IGetAlbumsParams,
  type PatchAlbumDto,
} from '@domain/album';
import type { IPaginatedResult } from '@domain/shared';
import { SEED_ALBUM, simulateFaultAlbum } from '@infrastructure/album/repositories';
import { applyPaginationAndSorting, InMemoryDb, runDataCommand } from '@infrastructure/utils';
import { withDelay } from '@infrastructure/utils/delay';
import { injectable } from 'tsyringe';

@injectable()
export class AlbumRepositoryMock implements AlbumRepository {
  private readonly db = new InMemoryDb<AlbumEntity>(SEED_ALBUM);

  async getAll(params?: IGetAlbumsParams): Promise<IPaginatedResult<AlbumEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultAlbum('getAll');

    const allAlbums = this.db.getAll();
    const total = allAlbums.length;

    const sortedPaginatedAlbums = applyPaginationAndSorting(allAlbums, params);

    const paginatedResult: IPaginatedResult<AlbumEntity> = {
      data: sortedPaginatedAlbums,
      total,
    };

    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<AlbumEntity> {
    await simulateFaultAlbum('getById', id);

    const album = this.db.getById(id);
    if (!album) throw new AlbumNotFoundError(id);

    return withDelay(album);
  }

  async create(album: CreateAlbumDto): Promise<AlbumEntity> {
    await simulateFaultAlbum('create');
    const newAlbum = this.db.create(album);
    return withDelay(newAlbum);
  }

  async update(id: number, album: CreateAlbumDto): Promise<AlbumEntity> {
    await simulateFaultAlbum('update', id);

    const updated = this.db.update(id, album);
    if (!updated) throw new AlbumNotFoundError(id);

    return withDelay(updated);
  }

  async patch(id: number, fields: PatchAlbumDto): Promise<AlbumEntity> {
    await simulateFaultAlbum('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new AlbumNotFoundError(id);

    return withDelay(patched);
  }
  async delete(id: number): Promise<boolean> {
    await simulateFaultAlbum('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new AlbumNotFoundError(id);

    return withDelay(true);
  }
}
