import type { PostEntity } from '@domain/post';
import type { IGetQueryParams } from '@domain/shared';

export type IGetPostsParams = IGetQueryParams<PostEntity>;
