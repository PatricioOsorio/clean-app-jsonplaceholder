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
