export const QUERY_KEYS = {
  posts: {
    all: () => ['posts'] as const,
    byUser: (userId: number) => ['posts', 'user', userId] as const,
    detail: (id?: number) => ['posts', id] as const,
  },
  comments: {
    byPost: (postId?: number) => ['comments', 'post', postId] as const,
  },
} as const;
