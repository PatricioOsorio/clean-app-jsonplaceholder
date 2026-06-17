/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'tsyringe';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { ENV } from '@infrastructure/utils';
import type { HttpRepository } from '@domain/http/http.repo';
import { HttpError } from '@domain/http/errors/http.error';

@injectable()
export class AxiosHttpClient implements HttpRepository {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: ENV.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private handleError(error: unknown): never {
    // not an axios error → re-throw as is
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    // server/network error (CORS, DNS, offline)
    if (!error.response) {
      throw error;
    }

    // server responded with status code (4xx, 5xx)
    throw new HttpError(error.response.status, error.response.data?.message ?? error.message);
  }

  async get<T>(url: string, config?: any): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async post<T>(url: string, data?: unknown, config?: any): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async put<T>(url: string, data?: unknown, config?: any): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async patch<T>(url: string, data?: unknown, config?: any): Promise<T> {
    try {
      const response = await this.client.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async delete<T>(url: string, config?: any): Promise<T> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
