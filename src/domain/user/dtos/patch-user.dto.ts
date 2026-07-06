import type { IAddress, IContact, ICompany } from '@domain/user';

export type IPatchUserProps = {
  name?: string;
  userName?: string;
  mail?: string;
  address?: IAddress;
  contact?: IContact;
  company?: ICompany;
};

export class PatchUserDto implements IPatchUserProps {
  static readonly VALIDATOR_TOKEN = Symbol('PatchUserDto.Validator');

  readonly name?: string;
  readonly userName?: string;
  readonly mail?: string;
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
