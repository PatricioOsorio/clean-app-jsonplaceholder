import type { AlbumEntity } from '@domain/album';
import { AlbumInvalidDataError, AlbumNotFoundError } from '@domain/album/errors';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultAlbum = createFaultSimulator<number>((fault, id = 0) => {
  if (fault === 'not-found') return new AlbumNotFoundError(id);
  if (fault === 'invalid') return new AlbumInvalidDataError('Simulated invalid data');
});

export const SEED_ALBUM: AlbumEntity[] = [
  {
    id: 1,
    idUser: 1,
    title: 'Album 1',
  },
  {
    id: 2,
    idUser: 1,
    title: 'Album 2',
  },
  {
    id: 3,
    idUser: 1,
    title: 'Album 3',
  },
];
