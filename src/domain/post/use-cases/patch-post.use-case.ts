import { PostInvalidDataError } from '../errors/post-invalid-data.error';
import { PostRepository, type IPatchPostInput } from '../post.repo';
import type { IPost } from '../post.entity';

export class PatchPostUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(id: number, fields: IPatchPostInput): Promise<IPost> {
    if (!id) throw new PostInvalidDataError('Post ID is required');

    const { title, content } = fields;

    if (title !== undefined && title.trim() === '')
      throw new PostInvalidDataError('Title cannot be empty');

    if (content !== undefined && content.trim() === '')
      throw new PostInvalidDataError('Content cannot be empty');

    const updatedPost = await this.postRepo.patch(id, fields);

    return updatedPost;
  }
}
