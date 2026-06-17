export type UpdatePostProps = { idUser: number; title: string; content: string };

export class UpdatePostDto implements UpdatePostProps {
  static readonly VALIDATOR_TOKEN = Symbol('UpdatePostDto.Validator');

  readonly idUser!: number;
  readonly title!: string;
  readonly content!: string;

  private constructor(props: UpdatePostProps) {
    Object.assign(this, props);
  }

  static create(data: UpdatePostProps): UpdatePostDto {
    return new UpdatePostDto(data);
  }
}
