import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../decoradores/roles.decorator';
import { PayloadJwt, Rol } from '../dominio/usuario';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requeridos = this.reflector.getAllAndOverride<Rol[]>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requeridos) return true;
    const { user } = context.switchToHttp().getRequest<{ user: PayloadJwt }>();
    if (!requeridos.includes(user.rol)) {
      throw new ForbiddenException('No tienes permiso para esta accion');
    }
    return true;
  }
}