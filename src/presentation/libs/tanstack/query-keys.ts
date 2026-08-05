import type { IGetAlbumsParams } from '@domain/album';
import type { IGetCommentsParams } from '@domain/comment';
import type { IGetPhotosParams } from '@domain/photo';
import type { IGetPostsParams } from '@domain/post/post.interfaces';
import type { IGetTodosParams } from '@domain/todo';
import type { IGetUsersParams } from '@domain/user';

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
  todos: {
    all: (params?: IGetTodosParams) => ['todos', 'list', params] as const,
  },
  albums: {
    all: (params?: IGetAlbumsParams) => ['albums', 'list', params] as const,
  },
  photos: {
    all: (params?: IGetPhotosParams) => ['photos', 'list', params] as const,
  },
  users: {
    all: (params?: IGetUsersParams) => ['users', 'list', params] as const,
  },
} as const;
