import type { UserEntity } from '@domain/user';
import type { IUserVM } from './user.vm';

export abstract class UserMapper {
  private static mapAddress(address?: UserEntity['address']): IUserVM['address'] | undefined {
    if (!address) return undefined;

    return {
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    };
  }

  private static mapContact(contact?: UserEntity['contact']): IUserVM['contact'] | undefined {
    if (!contact) return undefined;

    return {
      phone: contact.phone,
      website: contact.website,
    };
  }

  private static mapCompany(company?: UserEntity['company']): IUserVM['company'] | undefined {
    if (!company) return undefined;

    return {
      name: company.name,
      slogan: company.slogan,
    };
  }

  static toVM(entity: UserEntity): IUserVM {
    return {
      id: entity.id,
      email: entity.mail,
      name: entity.name,
      userName: entity.userName,
      address: this.mapAddress(entity.address),
      contact: this.mapContact(entity.contact),
      company: this.mapCompany(entity.company),
    };
  }
}
