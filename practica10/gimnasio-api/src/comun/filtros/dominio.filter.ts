import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  CupoLlenoError,
  ErrorDeDominio,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from '../../inscripciones/dominio/errores';

@Catch(ErrorDeDominio)
export class DominioExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Dominio');

  catch(error: ErrorDeDominio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    let statusCode = 500;
    if (error instanceof HorarioNoEncontradoError || error instanceof MiembroNoEncontradoError) {
      statusCode = 404;
    } else if (error instanceof CupoLlenoError || error instanceof InscripcionDuplicadaError) {
      statusCode = 409;
    }

    this.logger.warn(`${error.constructor.name}: ${error.message}`);

    res.status(statusCode).json({
      statusCode,
      error: error.constructor.name,
      message: error.message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}