import type { IAddress, IContact, ICompany } from '@domain/user';

export type ICreateUserProps = {
  name: string;
  userName: string;
  mail: string;
  address?: IAddress;
  contact?: IContact;
  company?: ICompany;
};

export class CreateUserDto implements ICreateUserProps {
  static readonly VALIDATOR_TOKEN = Symbol('CreateUserDto.Validator');

  readonly name!: string;
  readonly userName!: string;
  readonly mail!: string;
  readonly address?: IAddress;
  readonly contact?: IContact;
  readonly company?: ICompany;

  private constructor(props: ICreateUserProps) {
    Object.assign(this, props);
  }

  static create(data: ICreateUserProps): CreateUserDto {
    return new CreateUserDto(data);
  }
}
