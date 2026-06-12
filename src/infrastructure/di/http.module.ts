import { container } from 'tsyringe';

import { HttpClient } from '../http/http.client';
// import { AxiosHttpClient } from '../http/axios/axios-http.client';
import { FetchHttpClient } from '../http/fetch/fetch-http.client';

// container.register(HttpClient.TOKEN, { useClass: AxiosHttpClient });
container.register(HttpClient.TOKEN, { useClass: FetchHttpClient });

export { container };
