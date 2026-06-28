export type IUpdatePostProps = { idUser: number; title: string; content: string };

export class UpdatePostDto implements IUpdatePostProps {
  static readonly VALIDATOR_TOKEN = Symbol('UpdatePostDto.Validator');

  readonly idUser!: number;
  readonly title!: string;
  readonly content!: string;

  private constructor(props: IUpdatePostProps) {
    Object.assign(this, props);
  }

  static create(data: IUpdatePostProps): UpdatePostDto {
    return new UpdatePostDto(data);
  }
}
