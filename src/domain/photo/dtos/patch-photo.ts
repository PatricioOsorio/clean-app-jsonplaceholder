import type { ICreatePhotoProps } from './create-photo';

export type IPatchPhotoProps = Partial<ICreatePhotoProps>;

export class PatchPhotoDto implements IPatchPhotoProps {
  static readonly VALIDATOR_TOKEN = Symbol('PatchPhotoDto.Validator');

  readonly idAlbum?: number;
  readonly title?: string;
  readonly url?: string;
  readonly thumbnailUrl?: string;

  private constructor(props: IPatchPhotoProps) {
    Object.assign(this, props);
  }

  static create(data: IPatchPhotoProps): PatchPhotoDto {
    return new PatchPhotoDto(data);
  }
}
