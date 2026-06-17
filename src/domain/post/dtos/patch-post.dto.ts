export type PatchPostProps = { idUser?: number; title?: string; content?: string };

export class PatchPostDto implements PatchPostProps {
  static readonly VALIDATOR_TOKEN = Symbol('PatchPostDto.Validator');

  readonly idUser?: number;
  readonly title?: string;
  readonly content?: string;

  private constructor(props: PatchPostProps) {
    Object.assign(this, props);
  }

  static create(data: PatchPostProps): PatchPostDto {
    return new PatchPostDto(data);
  }
}
