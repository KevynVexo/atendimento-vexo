import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  login: string;

  @MinLength(8)
  password: string;
}
