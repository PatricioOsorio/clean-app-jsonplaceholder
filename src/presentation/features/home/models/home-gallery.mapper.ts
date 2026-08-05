import type { IHomeGalleryItemVM } from '@presentation/features/home/components';
import type { IPhotoVM } from '@presentation/features/photos/models';

export abstract class HomeGalleryMapper {
  static toVM(photo: IPhotoVM): IHomeGalleryItemVM {
    return {
      id: photo.id,
      title: photo.title,
      url: photo.thumbnailUrl,
    };
  }

  static toVMs(photos: IPhotoVM[]): IHomeGalleryItemVM[] {
    return photos.map((photo) => this.toVM(photo));
  }
}
