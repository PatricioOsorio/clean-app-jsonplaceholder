export type IPatchAlbumProps = { idUser?: number; title?: string };

export class PatchAlbumDto implements IPatchAlbumProps {
  static readonly VALIDATOR_TOKEN = Symbol('PatchAlbumDto.Validator');

  readonly idUser?: number;
  readonly title?: string;

  private constructor(props: IPatchAlbumProps) {
    Object.assign(this, props);
  }

  static create(data: IPatchAlbumProps): PatchAlbumDto {
    return new PatchAlbumDto(data);
  }
}
