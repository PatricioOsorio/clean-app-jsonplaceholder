import type { StorageClient } from '@infrastructure/storage';

export class LocalDb<T extends { id: number }> {
  constructor(
    private readonly storage: StorageClient,
    private readonly key: string,
    private readonly initialSeed: T[],
  ) {}

  private read(): T[] {
    const data = this.storage.get<T[]>(this.key);
    if (!data) {
      this.write(this.initialSeed);
      return structuredClone(this.initialSeed);
    }
    return data;
  }

  private write(data: T[]): void {
    this.storage.set(this.key, data);
  }

  private nextId(data: T[]): number {
    return data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
  }

  resetToSeed(): void {
    this.write(structuredClone(this.initialSeed));
  }

  clear(): void {
    this.write([]);
  }

  getAll(): T[] {
    return structuredClone(this.read());
  }

  getById(id: number): T | undefined {
    const item = this.read().find((item) => item.id === id);
    return item ? structuredClone(item) : undefined;
  }

  getBy(predicate: (item: T) => boolean): T[] {
    return structuredClone(this.read().filter(predicate));
  }

  create(item: Omit<T, 'id'>): T {
    const data = this.read();
    const newItem = { ...item, id: this.nextId(data) } as T;
    data.push(newItem);
    this.write(data);
    return structuredClone(newItem);
  }

  update(id: number, item: Partial<T>): T | undefined {
    const data = this.read();
    const index = data.findIndex((i) => i.id === id);
    if (index === -1) return undefined;

    const cleanItem = Object.fromEntries(Object.entries(item).filter(([_, v]) => v !== undefined));
    const updatedItem = { ...data[index], ...cleanItem, id } as T;

    data[index] = updatedItem;
    this.write(data);

    return structuredClone(updatedItem);
  }

  delete(id: number): boolean {
    const data = this.read();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return false;

    data.splice(index, 1);
    this.write(data);

    return true;
  }
}
