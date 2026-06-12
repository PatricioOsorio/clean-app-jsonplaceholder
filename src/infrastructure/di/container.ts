import { container } from 'tsyringe';
import { DEPENDENCIES_TOKEN } from './dependencies';
import type { IDependencies } from './dependencies';

container.register(DEPENDENCIES_TOKEN, { useValue: {} as IDependencies });

export { container };
