import { useState } from 'react';
import { productos, type Producto } from './datos.ts';
import { Layout } from './Layout.tsx';
import { Encabezado } from './Encabezado.tsx';
import { PiePagina } from './PiePagina.tsx';
import { Filtros } from './Filtros.tsx';
import { Catalogo } from './Catalogo.tsx';

const CATEGORIAS = ['todas', 'calzado', 'ropa', 'accesorios'];

export default function App() {
  // Estado: SOLO lo que cambia por una acción del usuario.
  const [filtro, setFiltro] = useState('todas');
  const [carrito, setCarrito] = useState<Producto[]>([]);

  // Derivado: se calcula en cada pintada, no se guarda en el estado.
  const visibles =
    filtro === 'todas' ? productos : productos.filter((p) => p.categoria === filtro);
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  function agregar(producto: Producto) {
    carrito.push(producto);
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
      <Catalogo productos={visibles} onAgregar={agregar} />
    </Layout>
  );
}