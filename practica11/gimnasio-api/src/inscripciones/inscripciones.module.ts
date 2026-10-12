import { Module } from '@nestjs/common';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens';
import { InscripcionPrismaRepository } from './infra/inscripcion-prisma.repository';

@Module({
  controllers: [InscripcionesController],
  providers: [
    InscripcionesService,
    {
      provide: INSCRIPCION_REPOSITORY,
      useClass: InscripcionPrismaRepository,
      //         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Practica 9 (Blindar la API): esta linea pasa de InscripcionMemoriaRepository a InscripcionPrismaRepository.
      // Ni el Service ni el Controller se enteran.
    },
  ],
})
export class InscripcionesModule {}
