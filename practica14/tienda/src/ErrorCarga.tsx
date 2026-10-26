interface ErrorCargaProps {
  mensaje: string;
  onReintentar: () => void;
}

export function ErrorCarga({ mensaje, onReintentar }: ErrorCargaProps) {
  return (
    <div className="error">
      <p>{mensaje}</p>
      <button onClick={onReintentar}>Reintentar</button>
    </div>
  );
}