import type { PhotoEntity } from '@domain/photo';
import { PhotoInvalidDataError, PhotoNotFoundError } from '@domain/photo/errors';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultPhoto = createFaultSimulator<number>((fault, id = 0) => {
  if (fault === 'not-found') return new PhotoNotFoundError(id);
  if (fault === 'invalid') return new PhotoInvalidDataError('Simulated invalid data');
});

export const SEED_PHOTOS: PhotoEntity[] = [
  {
    id: 1,
    idAlbum: 1,
    title: 'accusamus ea aliquid et et eaque exercitationem',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    id: 2,
    idAlbum: 1,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796',
  },
];
