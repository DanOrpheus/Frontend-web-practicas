import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegistroDto {
  @IsEmail()
  correo!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsInt()
  miembroId?: number;
}

export class LoginDto {
  @IsEmail()
  correo!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class TokenDto {
  access_token!: string;
  token_type!: string;
  expires_in!: number;
}