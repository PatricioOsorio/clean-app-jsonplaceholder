import { container } from 'tsyringe';

import { HttpClient, AxiosHttpClient } from '@infrastructure/http';

// import { FetchHttpClient } from '../http/fetch/fetch-http.client';

container.register(HttpClient.TOKEN, { useClass: AxiosHttpClient });
// container.register(HttpClient.TOKEN, { useClass: FetchHttpClient });

export { container };
