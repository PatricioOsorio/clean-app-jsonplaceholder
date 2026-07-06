export type IPatchCommentProps = {
  idPost?: number;
  name?: string;
  email?: string;
  content?: string;
};

export class PatchCommentDto implements IPatchCommentProps {
  static readonly VALIDATOR_TOKEN = Symbol('PatchCommentDto.Validator');

  readonly idPost?: number;
  readonly name?: string;
  readonly email?: string;
  readonly content?: string;

  private constructor(props: IPatchCommentProps) {
    Object.assign(this, props);
  }

  static create(data: IPatchCommentProps): PatchCommentDto {
    return new PatchCommentDto(data);
  }
}
