import type { PhotoEntity } from '@domain/photo';
import type { IPhotoVM } from './photo.vm';

export abstract class PhotoMapper {
  static toVM(entity: PhotoEntity): IPhotoVM {
    return {
      id: entity.id,
      albumId: entity.idAlbum,
      title: entity.title,
      url: entity.url,
      thumbnailUrl: entity.thumbnailUrl,
    };
  }

  static toVMs(entities: PhotoEntity[]): IPhotoVM[] {
    return entities.map((entity) => this.toVM(entity));
  }
}
