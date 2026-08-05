import type { ICreatePhotoProps } from './create-photo';

export type IUpdatePhotoProps = ICreatePhotoProps;

export class UpdatePhotoDto implements IUpdatePhotoProps {
  static readonly VALIDATOR_TOKEN = Symbol('UpdatePhotoDto.Validator');

  readonly idAlbum!: number;
  readonly title!: string;
  readonly url!: string;
  readonly thumbnailUrl!: string;

  private constructor(props: IUpdatePhotoProps) {
    Object.assign(this, props);
  }

  static create(data: IUpdatePhotoProps): UpdatePhotoDto {
    return new UpdatePhotoDto(data);
  }
}
