export type ICreateCommentProps = {
  idPost: number;
  name: string;
  email: string;
  content: string;
};

export class CreateCommentDto implements ICreateCommentProps {
  static readonly VALIDATOR_TOKEN = Symbol('CreateCommentDto.Validator');

  readonly idPost!: number;
  readonly name!: string;
  readonly email!: string;
  readonly content!: string;

  private constructor(props: ICreateCommentProps) {
    Object.assign(this, props);
  }

  static create(data: ICreateCommentProps): CreateCommentDto {
    return new CreateCommentDto(data);
  }
}
