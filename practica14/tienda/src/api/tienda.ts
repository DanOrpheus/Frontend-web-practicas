import { isAxiosError } from 'axios';
import { api } from './cliente.ts';
import type { Producto } from '../datos.ts';

// El sobre que manda la API: { data, meta }
interface Sobre<T> {
  data: T;
  meta?: unknown;
}

export interface DatosPedido {
  correo: string;
  telefono: string;
  productos: string[]; // ids del carrito; si un id se repite, son dos piezas
}

export async function pedirProductos(): Promise<Producto[]> {
  const { data: sobre } = await api.get<Sobre<Producto[]>>('/productos');
  return sobre.data; // se saca la lista del sobre
}

export async function crearPedido(pedido: DatosPedido): Promise<{ folio: string; total: number }> {
  const { data: sobre } = await api.post<Sobre<{ folio: string; total: number }>>('/pedidos', pedido);
  return sobre.data;
}

// Convierte cualquier error de Axios en un texto para mostrar.
export function mensajeDeError(err: unknown): string {
  if (isAxiosError(err) && err.response) {
    const m = err.response.data?.message;
    return Array.isArray(m) ? m.join(', ') : (m ?? `Error ${err.response.status}`);
  }
  return 'No se pudo conectar con la API.';
}