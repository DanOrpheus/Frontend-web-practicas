import { Module } from '@nestjs/common';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { ClasePrismaRepository } from './infra/clase-prisma.repository';
import { CLASE_REPOSITORY } from './clases.tokens';

@Module({
  controllers: [ClasesController],
  providers: [
    ClasesService,
    {
      provide: CLASE_REPOSITORY,
      useClass: ClasePrismaRepository,
      //         ^^^^^^^^^^^^^^^^^^^^^^
      // Practica 9 (Prisma - Blindar la API): esta linea pasa de ClaseMemoriaRepository a ClasePrismaRepository.
      // Ni el Service ni el Controller se enteran.
    },
  ],
})
export class ClasesModule {}
