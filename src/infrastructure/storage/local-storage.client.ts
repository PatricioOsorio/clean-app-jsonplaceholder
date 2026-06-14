import { injectable } from 'tsyringe';

import { StorageClient } from './storage.client';

@injectable()
export class LocalStorageClient implements StorageClient {
  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;

    try {
      return JSON.parse(raw) as T;
    } catch {
      // corrupt data → treat as absent so callers can re-seed
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
