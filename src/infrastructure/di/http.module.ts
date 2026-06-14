import { container } from 'tsyringe';

import { HttpClient } from '@infrastructure/http/http.client';
import { AxiosHttpClient } from '@infrastructure/http/axios/axios-http.client';

// import { FetchHttpClient } from '../http/fetch/fetch-http.client';

container.register(HttpClient.TOKEN, { useClass: AxiosHttpClient });
// container.register(HttpClient.TOKEN, { useClass: FetchHttpClient });

export { container };

