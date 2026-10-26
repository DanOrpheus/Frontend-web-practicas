import { useState, type FormEvent } from 'react';
import type { Producto } from './datos.ts';
import { crearPedido, mensajeDeError } from './api/tienda.ts';

interface FormularioPagoProps {
  carrito: Producto[];
  onPagado: () => void;
}

export function FormularioPago({ carrito, onPagado }: FormularioPagoProps) {
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [folio, setFolio] = useState('');

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // evita que el navegador recargue la página

    if (!correo.includes('@')) return setError('El correo debe tener @.');
    if (!/^\d{10}$/.test(telefono)) return setError('El teléfono debe tener 10 dígitos.');
    if (carrito.length === 0) return setError('El carrito está vacío.');

    setError('');
    setFolio('');
    setEnviando(true);
    try {
      const pedido = await crearPedido({ correo, telefono, productos: carrito.map((p) => p.id) });
      setFolio(pedido.folio);
      setCorreo('');
      setTelefono('');
      onPagado();
    } catch (err) {
      setError(mensajeDeError(err)); // aquí sale el 409
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <form className="pago" onSubmit={enviar}>
        <h2>Pago simulado</h2>
        <label>
          Correo
          <input value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </label>
        <label>
          Teléfono
          <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </label>
        {error && <p className="pago__error">{error}</p>}
        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando…' : 'Pagar'}
        </button>
      </form>

      {folio && (
        <div className="confirmacion">
          Pedido confirmado. Folio: <strong>{folio}</strong>
        </div>
      )}
    </>
  );
}