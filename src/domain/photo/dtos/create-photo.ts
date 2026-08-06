export type ICreatePhotoProps = {
  idAlbum: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export class CreatePhotoDto implements ICreatePhotoProps {
  static readonly TOKEN = Symbol('CreatePhotoDto.Validator');

  readonly idAlbum!: number;
  readonly title!: string;
  readonly url!: string;
  readonly thumbnailUrl!: string;

  private constructor(props: ICreatePhotoProps) {
    Object.assign(this, props);
  }

  static create(data: ICreatePhotoProps): CreatePhotoDto {
    return new CreatePhotoDto(data);
  }
}
