# Práctica 11 - Componentes con TypeScript Puro
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea

### 1.1. Cambiar la variante en el HTML y anotar qué pasa sin tocar el TypeScript
> Cambia el aspecto del botón al instante (por ejemplo de borde azul de _"secundario"_ a rojo con _"peligro"_) sin tocar nada de TypeScript. Pasa porque **variante** está en **observedAttributes**, así que el navegador llama a **attributeChangedCallback** y este vuelve a pintar el botón con la clase nueva.

### 1.2. ¿por qué el nombre de una etiqueta propia debe llevar guion?
> Porque el navegador necesita distinguir las etiquetas propias de las oficiales de HTML. Ninguna etiqueta estándar (**button**, **div**, etc.) lleva guion, y el estándar lo reservó para los componentes propios, así una etiqueta nueva del estándar nunca va a chocar con la mía. Si se intenta registrar algo como **customElements.define**(‘boton’, ...) el navegador lanza un error por nombre inválido.

### 2. ¿Por qué los atributos llegan como texto?
> Porque todo atributo HTML es un string, aunque yo le pase String(p.precio). Si no lo convierto con Number(), la existencia “0” es un texto no vacío y se evalúa como verdadero, así que la tarjeta nunca se marcaría como agotada, y el precio tampoco se podría formatear como moneda ni usar en cuentas.

### 3.1. ¿Qué pasa sin **composed: true**?
> El contador se queda quieto y no sale ningún error. El evento se emite dentro del árbol de sombra y, sin composed: true, no puede cruzar la frontera del shadow root hacia el DOM normal, así que el listener de la rejilla nunca lo recibe. El código no está roto, el evento sí se emitió y nada más no llega a nadie, por eso el navegador no avisa.

### 3.2. ¿Por qué un solo listener en la rejilla?
> Porque el evento burbujea: sube de cada tarjeta hasta su contenedor, así que un solo listener en la rejilla atiende las doce tarjetas, y también las que agregue después. Con uno por tarjeta serían doce listeners repetidos y habría que acordarse de ponérselo a cada tarjeta nueva.

### 3.3. El contrato de un componente
> Lo que recibe son los atributos y el slot (nombre, precio, variante, el texto del botón). Lo que avisa hacia afuera es el evento agregar, con id, nombre y precio en detail. Lo que nadie más puede tocar es lo de adentro del shadow DOM: el CSS de la página no lo afecta y el código de afuera no lo alcanza con querySelector.