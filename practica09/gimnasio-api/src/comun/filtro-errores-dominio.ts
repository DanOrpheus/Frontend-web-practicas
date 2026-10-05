import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { ErrorDeDominio, HorarioNoEncontradoError, MiembroNoEncontradoError } from '../inscripciones/dominio/errores';

@Catch(ErrorDeDominio)
export class FiltroErroresDominio implements ExceptionFilter {
  catch(error: ErrorDeDominio, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const esNoEncontrado =
      error instanceof HorarioNoEncontradoError || error instanceof MiembroNoEncontradoError;

    const excepcion = esNoEncontrado
      ? new NotFoundException(error.message)
      : new ConflictException(error.message);

    const statusCode = excepcion.getStatus();

    response.status(statusCode).json({
      statusCode,
      message: error.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}