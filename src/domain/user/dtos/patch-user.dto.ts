import type { IAddress, IContact, ICompany } from '@domain/user';

export type IPatchUserProps = {
  name?: string;
  userName?: string;
  email?: string;
  address?: IAddress;
  contact?: IContact;
  company?: ICompany;
};

export class PatchUserDto implements IPatchUserProps {
  static readonly TOKEN = Symbol('PatchUserDto.Validator');

  readonly name?: string;
  readonly userName?: string;
  readonly email?: string;
  readonly address?: IAddress;
  readonly contact?: IContact;
  readonly company?: ICompany;

  private constructor(props: IPatchUserProps) {
    Object.assign(this, props);
  }

  static create(data: IPatchUserProps): PatchUserDto {
    return new PatchUserDto(data);
  }
}
