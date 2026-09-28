import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import type { CrearMiembroDto } from './dto/crear-miembro.dto';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly servicio: MiembrosService) {}

  @Get()
  listar() {
    return this.servicio.listar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const miembro = await this.servicio.buscar(Number(id));
    if (!miembro) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return miembro;
  }

  @Post()
  crear(@Body() dto: CrearMiembroDto) {
    return this.servicio.crear(dto);
  }

  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarMiembroDto) {
    const miembro = await this.servicio.actualizar(Number(id), dto);
    if (!miembro) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
    return miembro;
  }

  @Delete(':id')
  @HttpCode(204)
  async eliminar(@Param('id') id: string) {
    const eliminado = await this.servicio.eliminar(Number(id));
    if (!eliminado) {
      throw new NotFoundException(`No existe el miembro ${id}`);
    }
  }
}