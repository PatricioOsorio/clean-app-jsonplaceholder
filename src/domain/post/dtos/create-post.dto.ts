export type CreatePostProps = { idUser: number; title: string; content: string };

export class CreatePostDto implements CreatePostProps {
  static readonly VALIDATOR_TOKEN = Symbol('CreatePostDto.Validator');

  readonly idUser!: number;
  readonly title!: string;
  readonly content!: string;

  private constructor(props: CreatePostProps) {
    Object.assign(this, props);
  }

  static create(data: CreatePostProps): CreatePostDto {
    return new CreatePostDto(data);
  }
}
