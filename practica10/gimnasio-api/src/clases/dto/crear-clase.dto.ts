import { IsOptional, IsString } from 'class-validator';

export class CrearClaseDto {
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
