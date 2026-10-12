import { Module } from '@nestjs/common';
import { HorariosController } from './horarios.controller';
import { HorariosService } from './horarios.service';
import { HORARIO_REPOSITORY } from './horarios.tokens';
import { HorarioPrismaRepository } from './infra/horario-prisma.repository';

@Module({
  controllers: [HorariosController],
  providers: [
    HorariosService,
    {
      provide: HORARIO_REPOSITORY,
      useClass: HorarioPrismaRepository,
      //         ^^^^^^^^^^^^^^^^^^^^^^^^
      // Practica 9 (Blindar la API): esta linea pasa de HorarioMemoriaRepository a HorarioPrismaRepository.
      // Ni el Service ni el Controller se enteran.
    },
  ],
  exports: [HorariosService],
})
export class HorariosModule {}
