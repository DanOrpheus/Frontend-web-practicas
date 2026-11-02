import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './componentes/Layout.tsx';
import { NoEncontrado } from './componentes/NoEncontrado.tsx';
import { PaginaClases } from './paginas/PaginaClases.tsx';
import { PaginaClase } from './paginas/PaginaClase.tsx';

export default function App() {
  return (
    <Routes>
      {/* Ruta de layout: sin path, solo pinta <Layout> con un <Outlet /> para sus hijas */}
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/clases" replace />} />

        <Route path="clases">
          <Route index element={<PaginaClases />} />
          <Route path=":id" element={<PaginaClase />} />
        </Route>

        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}