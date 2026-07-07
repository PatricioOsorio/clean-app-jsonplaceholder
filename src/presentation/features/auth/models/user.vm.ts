export interface IAddressVM {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface IContactVM {
  phone?: string;
  website?: string;
}

export interface ICompanyVM {
  name?: string;
  slogan?: string;
}

export interface IUserVM {
  id: number;
  email: string;
  name: string;
  userName: string;
  address?: IAddressVM;
  contact?: IContactVM;
  company?: ICompanyVM;
}
