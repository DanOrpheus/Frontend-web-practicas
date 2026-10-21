# Práctica 13 - La Tienda: Composición, Eventos y Estado
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea



### 1. ¿Por qué el Layout no necesita saber que es una tienda?
> Porque el Layout solo pone el marco: recibe el encabezado y el pie como props y el contenido como children, y los acomoda, sin importar qué hay adentro. No lee productos ni carrito, así que lo mismo serviría para un blog o un panel. Lo que es de la tienda (el carrito, el total) lo conoce quien lo usa, o sea App, no el marco.

### 2.¿Qué pasa si escribes onClick={onAgregar(producto)} sin la flecha?
> La función se ejecuta al pintar la tarjeta y no al hacer clic, porque los paréntesis la llaman ahí mismo y a onClick le llega su resultado (undefined) en vez de una función. Como agregar cambia el estado, eso provoca otra pintada que la vuelve a llamar, y así en ciclo hasta que React corta con el error Too many re-renders. Con la flecha () => onAgregar(producto) le paso una función que solo se ejecuta cuando alguien hace clic.

### 3.¿Por qué con carrito.push(...) el contador no se mueve y no sale ningún error?
> Porque **push** modifica el mismo arreglo que ya estaba en el estado, y React decide si vuelve a pintar comparando la referencia: al seguir siendo el mismo arreglo, para React no cambió nada y no repinta. No hay error porque el código es válido, el dato sí cambió, pero React nunca se entera. Por eso hay que crear un arreglo nuevo con **[...carrito, producto]** y pasárselo a **setCarrito**.