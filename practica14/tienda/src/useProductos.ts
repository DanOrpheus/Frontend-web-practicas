import { useEffect, useState } from 'react';
import type { Producto } from './datos.ts';
import { pedirProductos } from './api/tienda.ts';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false; // evita pintar una respuesta vieja
    setCargando(true);
    setError('');

    pedirProductos()
      .then((lista) => { if (!cancelado) setProductos(lista); })
      .catch(() => { if (!cancelado) setError('No se pudo conectar con la API.'); })
      .finally(() => { if (!cancelado) setCargando(false); });

    return () => { cancelado = true; };
  }, [intento]); // cambia solo al reintentar

  const reintentar = () => setIntento((n) => n + 1);

  return { productos, cargando, error, reintentar };
}