/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHttpResponse<T> {
  data: T;
  headers: Record<string, string>;
  status: number;
}

export abstract class HttpRepository {
  static readonly TOKEN = Symbol('HttpRepository');
  abstract post<T>(url: string, data?: unknown, config?: any): Promise<IHttpResponse<T>>;
  abstract get<T>(url: string, config?: any): Promise<IHttpResponse<T>>;
  abstract put<T>(url: string, data?: unknown, config?: any): Promise<IHttpResponse<T>>;
  abstract patch<T>(url: string, data?: unknown, config?: any): Promise<IHttpResponse<T>>;
  abstract delete<T>(url: string, config?: any): Promise<IHttpResponse<T>>;
}
