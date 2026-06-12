/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'tsyringe';

import type { HttpClient } from '../http.client';
import { ENV } from '@infrastructure/utils/constants';
import { HttpError } from '../errors/http.error';

@injectable()
export class FetchHttpClient implements HttpClient {
  private readonly client: typeof fetch;
  private readonly baseURL: string = ENV.VITE_API_BASE_URL;

  constructor() {
    this.client = fetch.bind(window);
  }

  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const fullURL = `${this.baseURL}${url}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await this.client(fullURL, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText || 'Error fetching data');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : ({} as T);
  }

  async get<T>(url: string, config?: any): Promise<T> {
    return this.request<T>(url, { method: 'GET', ...config });
  }

  post<T>(url: string, data?: unknown, config?: any): Promise<T> {
    return this.request<T>(url, { method: 'POST', body: JSON.stringify(data), ...config });
  }

  put<T>(url: string, data?: unknown, config?: any): Promise<T> {
    return this.request<T>(url, { method: 'PUT', body: JSON.stringify(data), ...config });
  }

  patch<T>(url: string, data?: unknown, config?: any): Promise<T> {
    return this.request<T>(url, { method: 'PATCH', body: JSON.stringify(data), ...config });
  }

  delete<T>(url: string, config?: any): Promise<T> {
    return this.request<T>(url, { method: 'DELETE', ...config });
  }
}
