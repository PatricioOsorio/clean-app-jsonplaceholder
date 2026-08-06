export type ICreateAlbumProps = { idUser: number; title: string };

export class CreateAlbumDto implements ICreateAlbumProps {
  static readonly TOKEN = Symbol('CreateAlbumDto.Validator');

  readonly idUser!: number;
  readonly title!: string;

  private constructor(props: ICreateAlbumProps) {
    Object.assign(this, props);
  }

  static create(data: ICreateAlbumProps): CreateAlbumDto {
    return new CreateAlbumDto(data);
  }
}
