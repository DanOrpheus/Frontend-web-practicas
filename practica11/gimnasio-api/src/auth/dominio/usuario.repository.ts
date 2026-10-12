import type { NuevoUsuario, Usuario } from './usuario';

export interface UsuarioRepository {
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  buscarPorId(id: number): Promise<Usuario | null>;
  crear(datos: NuevoUsuario): Promise<Usuario>;
}

export const USUARIO_REPOSITORY = 'USUARIO_REPOSITORY';