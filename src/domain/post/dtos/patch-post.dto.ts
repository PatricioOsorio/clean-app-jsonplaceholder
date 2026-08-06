export type IPatchPostProps = { idUser?: number; title?: string; content?: string };

export class PatchPostDto implements IPatchPostProps {
  static readonly TOKEN = Symbol('PatchPostDto.Validator');

  readonly idUser?: number;
  readonly title?: string;
  readonly content?: string;

  private constructor(props: IPatchPostProps) {
    Object.assign(this, props);
  }

  static create(data: IPatchPostProps): PatchPostDto {
    return new PatchPostDto(data);
  }
}
