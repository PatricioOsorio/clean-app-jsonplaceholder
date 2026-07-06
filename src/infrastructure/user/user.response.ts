export interface IUserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddressResponse;
  phone: string;
  website: string;
  company: ICompanyResponse;
}

export interface IAddressResponse {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeoResponse;
}

export interface IGeoResponse {
  lat: string;
  lng: string;
}

export interface ICompanyResponse {
  name: string;
  catchPhrase: string;
  bs: string;
}
