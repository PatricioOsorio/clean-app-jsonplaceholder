import {
  UserEntity,
  type IAddress,
  type ICompany,
  type IContact,
  type IGetUsersParams,
} from '@domain/user';
import type { IAddressResponse, ICompanyResponse, IUserResponse } from '@infrastructure/user';

export abstract class UserMapper {
  private static mapAddress(address?: IAddressResponse): IAddress | undefined {
    if (!address) return undefined;

    return {
      street: address.street,
      state: address.suite,
      city: address.city,
      zipCode: address.zipcode,
    };
  }

  private static mapContact(phone?: string, website?: string): IContact | undefined {
    if (!phone && !website) return undefined;

    return {
      phone,
      website,
    };
  }

  private static mapCompany(company?: ICompanyResponse): ICompany | undefined {
    if (!company) return undefined;

    return {
      name: company.name,
      slogan: company.catchPhrase,
    };
  }

  static toEntity(response: IUserResponse): UserEntity {
    return new UserEntity(
      response.id,
      response.email,
      response.name,
      response.username,
      this.mapAddress(response.address),
      this.mapContact(response.phone, response.website),
      this.mapCompany(response.company),
    );
  }

  static toEntities(responses: IUserResponse[]): UserEntity[] {
    return responses.map((response) => this.toEntity(response));
  }

  static toResponse(entity: Partial<UserEntity>): Partial<IUserResponse> {
    const response: Partial<IUserResponse> = {};

    if (entity.id !== undefined) response.id = entity.id;
    if (entity.email !== undefined) response.email = entity.email;
    if (entity.name !== undefined) response.name = entity.name;
    if (entity.userName !== undefined) response.username = entity.userName;

    if (entity.address) {
      response.address = {
        street: entity.address.street || '',
        suite: entity.address.state || '',
        city: entity.address.city || '',
        zipcode: entity.address.zipCode || '',
        geo: { lat: '', lng: '' },
      };
    }

    if (entity.contact) {
      response.phone = entity.contact.phone || '';
      response.website = entity.contact.website || '';
    }

    if (entity.company) {
      response.company = {
        name: entity.company.name || '',
        catchPhrase: entity.company.slogan || '',
        bs: '',
      };
    }

    return response;
  }

  static toQueryParams(params?: IGetUsersParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    if (!params) return queryParams;

    if (params.page !== undefined) queryParams.append('_page', params.page.toString());
    if (params.limit !== undefined) queryParams.append('_limit', params.limit.toString());
    if (params.sort !== undefined) queryParams.append('_sort', params.sort);
    if (params.sortOrder !== undefined) queryParams.append('_order', params.sortOrder);

    return queryParams;
  }
}
