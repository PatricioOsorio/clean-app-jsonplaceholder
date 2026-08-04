export type IUpdateAlbumProps = { idUser: number; title: string };

export class UpdateAlbumDto implements IUpdateAlbumProps {
  static readonly VALIDATOR_TOKEN = Symbol('UpdateAlbumDto.Validator');

  readonly idUser!: number;
  readonly title!: string;

  private constructor(props: IUpdateAlbumProps) {
    Object.assign(this, props);
  }

  static create(data: IUpdateAlbumProps): UpdateAlbumDto {
    return new UpdateAlbumDto(data);
  }
}
