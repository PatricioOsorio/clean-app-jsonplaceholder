import type { CommentEntity } from '@domain/comment';
import type { IGetQueryParams } from '@domain/shared';

export type IGetCommentsParams = IGetQueryParams<CommentEntity>;
