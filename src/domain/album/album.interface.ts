import type { AlbumEntity } from '@domain/album';
import type { IGetQueryParams } from '@domain/shared';

export type IGetAlbumsParams = IGetQueryParams<AlbumEntity>;
