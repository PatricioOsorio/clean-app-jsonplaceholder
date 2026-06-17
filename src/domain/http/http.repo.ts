/* eslint-disable @typescript-eslint/no-explicit-any */

export abstract class HttpRepository {
  static TOKEN = Symbol('HttpRepository');
  abstract post<T>(url: string, data?: unknown, config?: any): Promise<T>;
  abstract get<T>(url: string, config?: any): Promise<T>;
  abstract put<T>(url: string, data?: unknown, config?: any): Promise<T>;
  abstract patch<T>(url: string, data?: unknown, config?: any): Promise<T>;
  abstract delete<T>(url: string, config?: any): Promise<T>;
}
