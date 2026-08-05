import { useQuery } from '@tanstack/react-query';

import type { IGetAlbumsParams } from '@domain/album';
import { AlbumMapper } from '@presentation/features/albums/models';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useAlbumsDependencies } from './use-albums-dependencies';

export const useAlbums = (params?: IGetAlbumsParams) => {
  const { albums } = useAlbumsDependencies();

  return useQuery({
    queryKey: QUERY_KEYS.albums.all(params),
    queryFn: async () => {
      const result = await albums.getAll(params);
      return {
        data: AlbumMapper.toVMs(result.data),
        total: result.total,
      };
    },
  });
};
