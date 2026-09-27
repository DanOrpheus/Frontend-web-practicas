import { Injectable } from '@nestjs/common';

export interface Clase {
  id: number;
  nombre: string;
}

@Injectable()
export class ClasesService {
  private clases: Clase[] = [
    { id: 1, nombre: 'Yoga' },
    { id: 2, nombre: 'Pilates' },
    { id: 3, nombre: 'Spinning' },
  ];

  listar(): Clase[] {
    return this.clases;
  }

  crear(nombre: string): Clase {
    const nueva: Clase = { id: this.clases.length + 1, nombre };
    this.clases.push(nueva);
    return nueva;
  }
}