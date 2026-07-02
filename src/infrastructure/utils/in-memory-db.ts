export class InMemoryDb<T extends { id: number }> {
  private data: T[];
  private readonly initialSeed: T[];

  constructor(seed: T[]) {
    this.initialSeed = structuredClone(seed);
    this.data = structuredClone(seed);
  }

  resetToSeed(): void {
    this.data = structuredClone(this.initialSeed);
  }

  clear(): void {
    this.data = [];
  }

  private nextId(): number {
    return this.data.length ? Math.max(...this.data.map((item) => item.id)) + 1 : 1;
  }

  getAll(): T[] {
    return structuredClone(this.data);
  }

  getById(id: number): T | undefined {
    const item = this.data.find((item) => item.id === id);
    return item ? structuredClone(item) : undefined;
  }

  getBy(predicate: (item: T) => boolean): T[] {
    return structuredClone(this.data.filter(predicate));
  }

  create(item: Omit<T, 'id'>): T {
    const newItem = { ...item, id: this.nextId() } as T;
    this.data.push(newItem);
    return structuredClone(newItem);
  }

  update(id: number, item: Partial<T>): T | undefined {
    const index = this.data.findIndex((i) => i.id === id);
    if (index === -1) return undefined;

    // Remove undefined values to avoid overwriting existing valid values
    const cleanItem = Object.fromEntries(Object.entries(item).filter(([_, v]) => v !== undefined));

    const updatedItem = { ...this.data[index], ...cleanItem, id } as T;
    this.data[index] = updatedItem;
    return structuredClone(updatedItem);
  }

  delete(id: number): boolean {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    return true;
  }
}
