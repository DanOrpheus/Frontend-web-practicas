export enum Rol {
  Miembro = 'miembro',
  Entrenador = 'entrenador',
  Admin = 'admin',
}

export interface Usuario {
  id: number;
  correo: string;
  passwordHash: string;
  rol: Rol;
  miembroId: number | null;
}

export type NuevoUsuario = Omit<Usuario, 'id'>;

export interface PayloadJwt {
  sub: number;
  correo: string;
  rol: Rol;
  miembroId: number | null;
}