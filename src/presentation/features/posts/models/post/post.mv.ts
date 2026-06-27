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
