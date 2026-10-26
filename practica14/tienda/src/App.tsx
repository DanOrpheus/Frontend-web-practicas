import { useState } from 'react';
import type { Producto } from './datos.ts';
import { useProductos } from './useProductos.ts';
import { Layout } from './Layout.tsx';
import { Encabezado } from './Encabezado.tsx';
import { PiePagina } from './PiePagina.tsx';
import { Filtros } from './Filtros.tsx';
import { Catalogo } from './Catalogo.tsx';
import { Cargando } from './Cargando.tsx';
import { ErrorCarga } from './ErrorCarga.tsx';
import { FormularioPago } from './FormularioPago.tsx';

const CATEGORIAS = ['todas', 'calzado', 'ropa', 'accesorios'];

export default function App() {
  const { productos, cargando, error, reintentar } = useProductos();
  const [filtro, setFiltro] = useState('todas');
  const [carrito, setCarrito] = useState<Producto[]>([]);

  const visibles =
    filtro === 'todas' ? productos : productos.filter((p) => p.categoria === filtro);
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  function agregar(producto: Producto) {
    setCarrito([...carrito, producto]); // copia nueva, no push
  }

  function alPagar() {
    setCarrito([]);   // vaciar el carrito
    reintentar();     // volver a pedir productos: existencia actualizada
  }

  return (
    <Layout
      encabezado={<Encabezado piezas={carrito.length} />}
      pie={<PiePagina piezas={carrito.length} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de temporada</h1>
        <p>{visibles.length} productos</p>
      </section>

      <Filtros categorias={CATEGORIAS} activa={filtro} onCambiar={setFiltro} />

      {cargando ? (
        <Cargando />
      ) : error ? (
        <ErrorCarga mensaje={error} onReintentar={reintentar} />
      ) : (
        <Catalogo productos={visibles} onAgregar={agregar} />
      )}

      <FormularioPago carrito={carrito} onPagado={alPagar} />
    </Layout>
  );
}