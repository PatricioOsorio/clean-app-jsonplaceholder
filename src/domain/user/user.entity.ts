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

export class UserEntity {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    public userName: string,
    public address?: IAddress,
    public contact?: IContact,
    public company?: ICompany,
  ) {}
}
