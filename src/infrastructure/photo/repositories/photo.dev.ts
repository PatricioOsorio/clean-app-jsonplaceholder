import type { PhotoEntity } from '@domain/photo';
import { PhotoInvalidDataError, PhotoNotFoundError } from '@domain/photo/errors';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultPhoto = createFaultSimulator<number>((fault, id = 0) => {
  if (fault === 'not-found') return new PhotoNotFoundError(id);
  if (fault === 'invalid') return new PhotoInvalidDataError('Simulated invalid data');
});

const DARK_NATURE_PICSUM_IDS = [1015, 1028, 1039, 1043, 1059];

const getPicsumUrl = (id: number, width: number, height: number) => {
  const imageId = DARK_NATURE_PICSUM_IDS[(id - 1) % DARK_NATURE_PICSUM_IDS.length];
  return `https://picsum.photos/id/${imageId}/${width}/${height}`;
};

export const SEED_PHOTOS: PhotoEntity[] = [
  {
    id: 1,
    idAlbum: 1,
    title: 'accusamus ea aliquid et et eaque exercitationem',
    url: getPicsumUrl(1, 200, 300),
    thumbnailUrl: getPicsumUrl(1, 150, 200),
  },
  {
    id: 2,
    idAlbum: 1,
    title: 'reprehenderit est deserunt velit ipsam',
    url: getPicsumUrl(2, 200, 300),
    thumbnailUrl: getPicsumUrl(2, 150, 200),
  },
  {
    id: 3,
    idAlbum: 1,
    title: 'officia porro iure quia iusto qui ipsa ut modi',
    url: getPicsumUrl(3, 200, 300),
    thumbnailUrl: getPicsumUrl(3, 150, 200),
  },
  {
    id: 4,
    idAlbum: 1,
    title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
    url: getPicsumUrl(4, 200, 300),
    thumbnailUrl: getPicsumUrl(4, 150, 200),
  },
  {
    id: 5,
    idAlbum: 1,
    title: 'natus nisi omnis corporis facere molestiae rerum in',
    url: getPicsumUrl(5, 200, 300),
    thumbnailUrl: getPicsumUrl(5, 150, 200),
  },
];
