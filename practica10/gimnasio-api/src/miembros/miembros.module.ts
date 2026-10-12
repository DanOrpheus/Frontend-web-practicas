import { Module } from '@nestjs/common';
import { MiembrosController } from './miembros.controller';
import { MiembrosService } from './miembros.service';
import { MIEMBRO_REPOSITORY } from './miembros.tokens';
import { MiembroPrismaRepository } from './infra/miembro-prisma.repository';

@Module({
  controllers: [MiembrosController],
  providers: [
    MiembrosService,
    {
      provide: MIEMBRO_REPOSITORY,
      useClass: MiembroPrismaRepository,
      //         ^^^^^^^^^^^^^^^^^^^^^^^^
      // Practica 9 (Blindar la API): esta linea pasa de MiembroMemoriaRepository a MiembroPrismaRepository.
      // Ni el Service ni el Controller se enteran.
    },
  ],
  exports: [MiembrosService],
})
export class MiembrosModule {}
