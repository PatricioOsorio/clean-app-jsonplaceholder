export type IRegisterProps = {
  userName: string;
  email: string;
  password: string;
};

export class RegisterDto {
  static readonly TOKEN = Symbol('RegisterDto.Validator');

  readonly userName!: string;
  readonly email!: string;
  readonly password!: string;

  private constructor(props: IRegisterProps) {
    Object.assign(this, props);
  }

  static create(data: IRegisterProps): RegisterDto {
    return new RegisterDto(data);
  }
}
