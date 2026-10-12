import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class SobreInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const inicio = Date.now();

    return next.handle().pipe(
      map((data) => ({
        data,
        meta: {
          ruta: req.url,
          duracionMs: Date.now() - inicio,
          timestamp: new Date().toISOString(),
        },
      })),
    );
  }
}