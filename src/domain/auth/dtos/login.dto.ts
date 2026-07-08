export type ILoginProps = {
  email: string;
  password: string;
};

export class LoginDto {
  static readonly VALIDATOR_TOKEN = Symbol('LoginDto.Validator');

  readonly email!: string;
  readonly password!: string;

  private constructor(props: ILoginProps) {
    Object.assign(this, props);
  }

  static create(data: ILoginProps): LoginDto {
    return new LoginDto(data);
  }
}
