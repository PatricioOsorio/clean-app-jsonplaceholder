import type { IAddress, IContact, ICompany } from '@domain/user';

export type IUpdateUserProps = {
  name: string;
  userName: string;
  email: string;
  address?: IAddress;
  contact?: IContact;
  company?: ICompany;
};

export class UpdateUserDto implements IUpdateUserProps {
  static readonly TOKEN = Symbol('UpdateUserDto.Validator');

  readonly name!: string;
  readonly userName!: string;
  readonly email!: string;
  readonly address?: IAddress;
  readonly contact?: IContact;
  readonly company?: ICompany;

  private constructor(props: IUpdateUserProps) {
    Object.assign(this, props);
  }

  static create(data: IUpdateUserProps): UpdateUserDto {
    return new UpdateUserDto(data);
  }
}
