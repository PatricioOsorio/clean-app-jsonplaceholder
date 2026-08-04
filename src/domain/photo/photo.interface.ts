import type { PhotoEntity } from '@domain/photo';
import type { IGetQueryParams } from '@domain/shared';

export type IGetPhotosParams = IGetQueryParams<PhotoEntity>;
