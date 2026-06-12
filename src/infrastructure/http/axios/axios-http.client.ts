/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'tsyringe';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { ENV } from '@infrastructure/utils/constants';
import { HttpClient } from '../http.client';

@injectable()
export class AxiosHttpClient implements HttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: ENV.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }
  async post<T>(url: string, data?: unknown, config?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }
  async put<T>(url: string, data?: unknown, config?: any): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }
  async patch<T>(url: string, data?: unknown, config?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}
