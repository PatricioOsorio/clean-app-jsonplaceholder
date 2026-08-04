import {
  AlbumEntity,
  AlbumNotFoundError,
  type AlbumRepository,
  type CreateAlbumDto,
  type IGetAlbumsParams,
  type PatchAlbumDto,
} from '@domain/album';
import type { IPaginatedResult, IValidatorEntity } from '@domain/shared';
import { SEED_ALBUM, simulateFaultAlbum } from '@infrastructure/album';
import { LOCAL_STORAGE_KEYS, StorageClient } from '@infrastructure/storage';
import {
  applyPaginationAndSorting,
  LocalDb,
  runDataCommand,
  withDelay,
} from '@infrastructure/utils';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AlbumRepositoryLocal implements AlbumRepository {
  private readonly db: LocalDb<AlbumEntity>;

  constructor(
    @inject(StorageClient.TOKEN) private readonly storage: StorageClient,
    @inject(AlbumEntity.VALIDATOR_TOKEN) private readonly validator: IValidatorEntity<AlbumEntity>,
  ) {
    this.db = new LocalDb<AlbumEntity>(this.storage, LOCAL_STORAGE_KEYS.albums, SEED_ALBUM);
  }

  async getAll(params?: IGetAlbumsParams): Promise<IPaginatedResult<AlbumEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultAlbum('getAll');

    const allAlbums = this.db.getAll().map((album) => this.validator.validate(album));
    const total = allAlbums.length;

    const paginatedAlbums = applyPaginationAndSorting(allAlbums, params);

    const paginatedResult: IPaginatedResult<AlbumEntity> = {
      data: paginatedAlbums,
      total,
    };
    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<AlbumEntity> {
    await simulateFaultAlbum('getById', id);

    const album = this.db.getById(id);
    if (!album) throw new AlbumNotFoundError(id);

    return withDelay(this.validator.validate(album));
  }

  async create(album: CreateAlbumDto): Promise<AlbumEntity> {
    await simulateFaultAlbum('create');

    const newAlbum = this.db.create(album);
    return withDelay(this.validator.validate(newAlbum));
  }

  async update(id: number, album: CreateAlbumDto): Promise<AlbumEntity> {
    await simulateFaultAlbum('update', id);

    const updated = this.db.update(id, album);
    if (!updated) throw new AlbumNotFoundError(id);

    return withDelay(this.validator.validate(updated));
  }

  async patch(id: number, fields: PatchAlbumDto): Promise<AlbumEntity> {
    await simulateFaultAlbum('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new AlbumNotFoundError(id);

    return withDelay(this.validator.validate(patched));
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultAlbum('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new AlbumNotFoundError(id);

    return withDelay(true);
  }
}
