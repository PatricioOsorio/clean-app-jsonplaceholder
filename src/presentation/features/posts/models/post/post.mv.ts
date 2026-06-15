import type { IPost } from '@domain/post';
import type { IWithOptimistic } from '@presentation/shared/models';

export type IPostCacheEntry = IWithOptimistic<IPost>;

export interface IPostVM {
  id: number;
  title: string;
  content: string;
  idUser?: number;
  __optimistic?: boolean;
}

export interface IPostCreateVM {
  title: string;
  content: string;
  idUser: number;
}

export interface IPostUpdateVM {
  id: number;
  title?: string;
  content?: string;
  idUser?: number;
}

export interface IPostFormVM {
  title: string;
  content: string;
}
