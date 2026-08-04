import { CreatePhotoDto, type ICreatePhotoProps } from './create-photo';

export class UpdatePhotoDto extends CreatePhotoDto {
  override static readonly VALIDATOR_TOKEN = Symbol('UpdatePhotoDto.Validator');

  static override create(data: ICreatePhotoProps): UpdatePhotoDto {
    return new UpdatePhotoDto(data);
  }
}
