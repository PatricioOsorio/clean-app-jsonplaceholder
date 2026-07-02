export interface ICommentVM {
  id: number;
  idPost: number;
  name: string;
  email: string;
  body: string;
  __isOptimistic?: boolean;
}
