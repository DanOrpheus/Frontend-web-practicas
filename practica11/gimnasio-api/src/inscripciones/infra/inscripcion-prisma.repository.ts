import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { Inscripcion, NuevaInscripcion } from '../dominio/entidades';
import type { InscripcionRepository } from '../dominio/inscripcion.repository';

@Injectable()
export class InscripcionPrismaRepository implements InscripcionRepository {
  constructor(private readonly prisma: PrismaService) {}

  listar(): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany();
  }

  buscarPorId(id: number): Promise<Inscripcion | null> {
    return this.prisma.inscripcion.findUnique({ where: { id } });
  }

  buscarPorHorario(horarioId: number): Promise<Inscripcion[]> {
    return this.prisma.inscripcion.findMany({ where: { horarioId } });
  }

  buscarHorario(horarioId: number) {
    return this.prisma.horario.findUnique({ where: { id: horarioId } });
  }

  buscarMiembro(miembroId: number) {
    return this.prisma.miembro.findUnique({ where: { id: miembroId } });
  }

  guardar(datos: NuevaInscripcion): Promise<Inscripcion> {
    return this.prisma.inscripcion.create({
      data: { horarioId: datos.horarioId, miembroId: datos.miembroId },
    });
  }

  cancelar(id: number): Promise<Inscripcion | null> {
    return this.prisma.inscripcion.update({
      where: { id },
      data: { estado: 'cancelada' },
    });
  }
}