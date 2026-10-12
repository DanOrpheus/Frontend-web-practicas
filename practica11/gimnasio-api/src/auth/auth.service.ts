import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { LoginDto, RegistroDto, TokenDto } from './dto/auth.dto';
import { PayloadJwt, Rol, Usuario } from './dominio/usuario';
import { USUARIO_REPOSITORY } from './dominio/usuario.repository';
import type { UsuarioRepository } from './dominio/usuario.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USUARIO_REPOSITORY) private readonly usuarios: UsuarioRepository,
    private readonly jwt: JwtService,
  ) {}

  async registrar(dto: RegistroDto): Promise<TokenDto> {
    if (await this.usuarios.buscarPorCorreo(dto.correo)) {
      throw new ConflictException('Ese correo ya esta registrado');
    }
    const passwordHash = await hash(dto.password, 10);
    const usuario = await this.usuarios.crear({
      correo: dto.correo,
      passwordHash,
      rol: Rol.Miembro,
      miembroId: dto.miembroId ?? null,
    });
    return this.firmar(usuario);
  }

  async login(dto: LoginDto): Promise<TokenDto> {
    const usuario = await this.usuarios.buscarPorCorreo(dto.correo);
    const valido = usuario ? await compare(dto.password, usuario.passwordHash) : false;
    if (!usuario || !valido) {
      throw new UnauthorizedException('Credenciales invalidas');
    }
    return this.firmar(usuario);
  }

  private firmar(usuario: Usuario): TokenDto {
    const payload: PayloadJwt = {
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
      miembroId: usuario.miembroId,
    };
    return { access_token: this.jwt.sign(payload), token_type: 'Bearer', expires_in: 3600 };
  }
}