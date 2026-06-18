import { container } from 'tsyringe';

import { StorageClient, LocalStorageClient } from '@infrastructure/storage';

container.register(StorageClient.TOKEN, { useClass: LocalStorageClient });

export { container };
