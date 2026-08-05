import type { AlbumEntity } from '@domain/album';
import type { IAlbumVM } from './album.vm';

export abstract class AlbumMapper {
  static toVM(entity: AlbumEntity): IAlbumVM {
    return {
      id: entity.id,
      userId: entity.idUser,
      title: entity.title,
    };
  }

  static toVMs(entities: AlbumEntity[]): IAlbumVM[] {
    return entities.map((entity) => this.toVM(entity));
  }
}
