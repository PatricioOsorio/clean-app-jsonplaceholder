export const QUERY_KEYS = {
  user: {
    posts: () => ['posts'] as const,
    postsByUser: (userId: number) => ['posts', 'byUser', userId] as const,
    post: (id?: number) => ['posts', id] as const,
  },
};
