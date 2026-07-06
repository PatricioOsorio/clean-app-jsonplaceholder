export type IUpdateCommentProps = {
  idPost: number;
  name: string;
  email: string;
  content: string;
};

export class UpdateCommentDto implements IUpdateCommentProps {
  static readonly VALIDATOR_TOKEN = Symbol('UpdateCommentDto.Validator');

  readonly idPost!: number;
  readonly name!: string;
  readonly email!: string;
  readonly content!: string;

  private constructor(props: IUpdateCommentProps) {
    Object.assign(this, props);
  }

  static create(data: IUpdateCommentProps): UpdateCommentDto {
    return new UpdateCommentDto(data);
  }
}
