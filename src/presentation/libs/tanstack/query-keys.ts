import type { IGetCommentsParams } from '@domain/comment';
import type { IGetPostsParams } from '@domain/post/post.interfaces';

export const QUERY_KEYS = {
  posts: {
    list: () => ['posts', 'list'] as const,
    all: (params?: IGetPostsParams) => ['posts', 'list', params] as const,
    byUser: (userId: number) => ['posts', 'user', userId] as const,
    detail: (id?: number) => ['posts', id] as const,
  },
  comments: {
    all: (params?: IGetCommentsParams) => ['comments', 'list', params] as const,
    byPost: (postId?: number) => ['comments', 'post', postId] as const,
  },
} as const;
