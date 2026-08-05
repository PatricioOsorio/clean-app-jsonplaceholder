import type { IFeaturedPostVM } from '@presentation/features/home/components';
import type { IPostVM } from '@presentation/features/posts/models/post';

export abstract class FeaturedPostMapper {
  static toVM(post: IPostVM): IFeaturedPostVM {
    return {
      id: post.id,
      title: post.title,
      body: post.content,
      user: `@user_${post.idUser}`,
    };
  }

  static toVMs(posts: IPostVM[]): IFeaturedPostVM[] {
    return posts.map((post) => this.toVM(post));
  }
}
