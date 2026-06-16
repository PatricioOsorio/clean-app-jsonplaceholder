export interface IPostVM {
  id: number;
  title: string;
  content: string;
  idUser: number;
  __optimistic?: boolean;
}

export interface IPostFormVM {
  title: string;
  content: string;
}

export interface IPostCreateInputVM {
  title: string;
  content: string;
  idUser: number;
}

export interface IPostUpdateInputVM {
  id: number;
  title: string;
  content: string;
  idUser: number;
}

export interface IPatchPostInputVM {
  id: number;
  title?: string;
  content?: string;
  idUser?: number;
}
