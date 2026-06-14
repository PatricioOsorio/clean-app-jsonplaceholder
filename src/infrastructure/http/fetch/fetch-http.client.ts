/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'tsyringe';

import { ENV } from '@infrastructure/utils';
import { HttpError } from '../errors/http.error';
import { HttpClient } from '../http.client';

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

  private handleError(error: unknown): never {
    // server/network error (CORS, DNS, offline)
    if (error instanceof TypeError) {
      throw error;
    }

    // Other errors (e.g., JSON parsing) can be wrapped in HttpError or re-thrown as is.
    if (error instanceof HttpError) {
      throw error;
    }
    // Server responded with an error status code (4xx, 5xx) or other unexpected errors
    throw new HttpError(500, (error as Error).message || 'Unexpected error');
  }

  async get<T>(url: string, config?: any): Promise<T> {
    try {
      return this.request<T>(url, { method: 'GET', ...config });
    } catch (error) {
      this.handleError(error);
    }
  }

  post<T>(url: string, data?: unknown, config?: any): Promise<T> {
    try {
      return this.request<T>(url, { method: 'POST', body: JSON.stringify(data), ...config });
    } catch (error) {
      this.handleError(error);
    }
  }

  put<T>(url: string, data?: unknown, config?: any): Promise<T> {
    try {
      return this.request<T>(url, { method: 'PUT', body: JSON.stringify(data), ...config });
    } catch (error) {
      this.handleError(error);
    }
  }

  patch<T>(url: string, data?: unknown, config?: any): Promise<T> {
    try {
      return this.request<T>(url, { method: 'PATCH', body: JSON.stringify(data), ...config });
    } catch (error) {
      this.handleError(error);
    }
  }

  delete<T>(url: string, config?: any): Promise<T> {
    try {
      return this.request<T>(url, { method: 'DELETE', ...config });
    } catch (error) {
      this.handleError(error);
    }
  }
}
