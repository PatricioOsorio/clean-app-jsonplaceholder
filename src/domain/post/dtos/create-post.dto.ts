export type ICreatePostProps = { idUser: number; title: string; content: string };

export class CreatePostDto implements ICreatePostProps {
  static readonly VALIDATOR_TOKEN = Symbol('CreatePostDto.Validator');

  readonly idUser!: number;
  readonly title!: string;
  readonly content!: string;

  private constructor(props: ICreatePostProps) {
    Object.assign(this, props);
  }

  static create(data: ICreatePostProps): CreatePostDto {
    return new CreatePostDto(data);
  }
}
