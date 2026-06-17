import { container } from 'tsyringe';

import { HttpRepository } from '@domain/http/http.repo';
import { AxiosHttpClient } from '@infrastructure/http';

container.register(HttpRepository.TOKEN, { useClass: AxiosHttpClient });

export { container };
