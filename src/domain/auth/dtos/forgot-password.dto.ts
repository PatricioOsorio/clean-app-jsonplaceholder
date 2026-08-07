export type IForgotPasswordProps = {
  email: string;
};

export class ForgotPasswordDto {
  static readonly TOKEN = Symbol('ForgotPasswordDto.Validator');

  readonly email!: string;

  private constructor(props: IForgotPasswordProps) {
    Object.assign(this, props);
  }

  static create(data: IForgotPasswordProps): ForgotPasswordDto {
    return new ForgotPasswordDto(data);
  }
}
