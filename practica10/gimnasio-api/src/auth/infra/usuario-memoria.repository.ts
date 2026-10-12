import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { NuevoUsuario, Rol, Usuario } from '../dominio/usuario';
import type { UsuarioRepository } from '../dominio/usuario.repository';

@Injectable()
export class UsuarioMemoriaRepository implements UsuarioRepository {
  private usuarios: Usuario[] = [];
  private siguienteId = 4;

  constructor() {
    const passwordHash = hashSync('gimnasio2026', 10);
    this.usuarios = [
      { id: 1, correo: 'karla@itson.mx', passwordHash, rol: Rol.Miembro, miembroId: 1 },
      { id: 2, correo: 'ana@itson.mx', passwordHash, rol: Rol.Entrenador, miembroId: null },
      { id: 3, correo: 'admin@itson.mx', passwordHash, rol: Rol.Admin, miembroId: null },
    ];
  }

  async buscarPorCorreo(correo: string) {
    return this.usuarios.find((u) => u.correo === correo) ?? null;
  }

  async buscarPorId(id: number) {
    return this.usuarios.find((u) => u.id === id) ?? null;
  }

  async crear(datos: NuevoUsuario) {
    const nuevo: Usuario = { id: this.siguienteId++, ...datos };
    this.usuarios.push(nuevo);
    return nuevo;
  }
}