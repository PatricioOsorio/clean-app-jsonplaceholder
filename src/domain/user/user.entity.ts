export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface IContact {
  phone?: string;
  website?: string;
}

export interface ICompany {
  name?: string;
  slogan?: string;
}

export interface IUserEntity {
  id: number;
  email: string;
  name: string;
  userName: string;
  address?: IAddress;
  contact?: IContact;
  company?: ICompany;
}

export class UserEntity {
  static readonly TOKEN = Symbol('UserEntity.Validator');

  readonly id!: number;
  readonly email!: string;
  readonly name!: string;
  readonly userName!: string;
  readonly address?: IAddress;
  readonly contact?: IContact;
  readonly company?: ICompany;

  constructor(props: IUserEntity) {
    Object.assign(this, props);
  }
}
