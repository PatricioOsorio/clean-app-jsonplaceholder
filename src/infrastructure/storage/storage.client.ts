export abstract class StorageClient {
  static readonly TOKEN = Symbol('StorageClient');
  abstract get<T>(key: string): T | null;
  abstract set<T>(key: string, value: T): void;
  abstract remove(key: string): void;
}
