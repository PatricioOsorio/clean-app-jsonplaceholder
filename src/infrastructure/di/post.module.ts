import { container } from 'tsyringe';

import { PostRepositoryImpl } from '../post/post.repo.impl';
import { PostRepository } from '@/domain/post/post.repo';

container.register(PostRepository.TOKEN, { useClass: PostRepositoryImpl });

export { container };
