import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { Clase } from '../dominio/entidades';
import type { ClaseRepository } from '../dominio/clase.repository';
import type { CrearClaseDto } from '../dto/crear-clase.dto';
import type { ActualizarClaseDto } from '../dto/actualizar-clase.dto';

@Injectable()
export class ClasePrismaRepository implements ClaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Clase[]> {
    return this.prisma.clase.findMany();
  }

  buscarPorId(id: number): Promise<Clase | null> {
    return this.prisma.clase.findUnique({ where: { id } });
  }

  crear(datos: CrearClaseDto): Promise<Clase> {
    return this.prisma.clase.create({ data: datos });
  }

  async actualizar(id: number, datos: ActualizarClaseDto): Promise<Clase | null> {
    try {
      return await this.prisma.clase.update({ where: { id }, data: datos });
    } catch {
      return null;
    }
  }

  async eliminar(id: number): Promise<Clase | null> {
    try {
      return await this.prisma.clase.delete({ where: { id } });
    } catch {
      return null;
    }
  }
}