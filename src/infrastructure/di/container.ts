import { container } from 'tsyringe';

import './modules/auth.module';
import './modules/comment.module';
import './modules/http.module';
import './modules/post.module';
import './modules/storage.module';
import './modules/user.module';
import './modules/album.module';
import './modules/photo.module';
import './modules/todo.module';

export { container };
