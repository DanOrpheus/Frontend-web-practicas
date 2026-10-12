import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NuevoUsuario, Rol, Usuario } from '../dominio/usuario';
import type { UsuarioRepository } from '../dominio/usuario.repository';

@Injectable()
export class UsuarioPrismaRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorCorreo(correo: string) {
    const u = await this.prisma.usuario.findUnique({ where: { correo } });
    return u ? this.aDominio(u) : null;
  }

  async buscarPorId(id: number) {
    const u = await this.prisma.usuario.findUnique({ where: { id } });
    return u ? this.aDominio(u) : null;
  }

  async crear(datos: NuevoUsuario) {
    return this.aDominio(await this.prisma.usuario.create({ data: datos }));
  }

  private aDominio(u: { id: number; correo: string; passwordHash: string; rol: string; miembroId: number | null }): Usuario {
    return { id: u.id, correo: u.correo, passwordHash: u.passwordHash, rol: u.rol as Rol, miembroId: u.miembroId };
  }
}