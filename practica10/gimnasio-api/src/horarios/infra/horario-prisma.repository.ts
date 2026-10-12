import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { Horario } from '../dominio/entidades';
import type { HorarioRepository } from '../dominio/horario.repository';
import type { CrearHorarioDto } from '../dto/crear-horario.dto';
import type { ActualizarHorarioDto } from '../dto/actualizar-horario.dto';

@Injectable()
export class HorarioPrismaRepository implements HorarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Horario[]> {
    return this.prisma.horario.findMany();
  }

  buscarPorId(id: number): Promise<Horario | null> {
    return this.prisma.horario.findUnique({ where: { id } });
  }

  crear(datos: CrearHorarioDto): Promise<Horario> {
    return this.prisma.horario.create({ data: datos });
  }

  async actualizar(id: number, datos: ActualizarHorarioDto): Promise<Horario | null> {
    try {
      return await this.prisma.horario.update({ where: { id }, data: datos });
    } catch {
      return null;
    }
  }

  async eliminar(id: number): Promise<Horario | null> {
    try {
      return await this.prisma.horario.delete({ where: { id } });
    } catch {
      return null;
    }
  }
}