import { useQuery } from '@tanstack/react-query';

import type { IGetPhotosParams } from '@domain/photo';
import { PhotoMapper } from '@presentation/features/photos/models';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePhotosDependencies } from './use-photos-dependencies';

export const usePhotos = (params?: IGetPhotosParams) => {
  const { photos } = usePhotosDependencies();

  return useQuery({
    queryKey: QUERY_KEYS.photos.all(params),
    queryFn: async () => {
      const result = await photos.getAll(params);
      return {
        data: PhotoMapper.toVMs(result.data),
        total: result.total,
      };
    },
  });
};
