# Práctica 14 - La Tienda contra su API
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea



### 1. ¿Por qué en la pestaña Red salen dos peticiones al cargar?
> Porque en **main.tsx** la app está envuelta en StrictMode, que en desarrollo monta cada componente, lo desmonta y lo vuelve a montar para detectar efectos mal escritos. Así el useEffect corre dos veces y pide **/productos** dos veces. En producción solo sale una, y por eso mi efecto trae cancelado: ignora la respuesta de la primera vuelta.

### 2.¿Qué pasa si quitas el arreglo de dependencias del efecto?
> Sin el arreglo, el efecto corre después de cada pintada. Pide los productos, **setProductos** cambia el estado, eso vuelve a pintar y el efecto pide otra vez, en un ciclo infinito. En la pestaña Red se llena de peticiones a **/productos** y puede tumbar la API.

### 3.¿Qué hace e.preventDefault() y qué pasa si lo quitas?
> Cancela el comportamiento por defecto del **submit**: que el navegador envíe el formulario y recargue la página. Sin él, al pulsar _Pagar_ la página se recarga antes de que la petición termine, se pierde el estado (carrito, folio, errores) y nunca vería el folio ni el 409.