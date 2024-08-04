export class LoginUserDto {
  email: string;
  password: string;
}
export class RegisterUserDto extends LoginUserDto {
  name: string;
  role: string;
}
