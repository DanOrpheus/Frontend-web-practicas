# Práctica 11 - Componentes con TypeScript Puro
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea

### 1.1. Cambiar la variante en el HTML y anotar qué pasa sin tocar el TypeScript
> Cambia el aspecto del botón al instante (por ejemplo de borde azul de _"secundario"_ a rojo con _"peligro"_) sin tocar nada de TypeScript. Pasa porque **variante** está en **observedAttributes**, así que el navegador llama a **attributeChangedCallback** y este vuelve a pintar el botón con la clase nueva.

### 1.2. ¿por qué el nombre de una etiqueta propia debe llevar guion?
> Porque el navegador necesita distinguir las etiquetas propias de las oficiales de HTML. Ninguna etiqueta estándar (**button**, **div**, etc.) lleva guion, y el estándar lo reservó para los componentes propios, así una etiqueta nueva del estándar nunca va a chocar con la mía. Si se intenta registrar algo como **customElements.define**(‘boton’, ...) el navegador lanza un error por nombre inválido.

### 3. ¿?
> 

### 4. ¿?
> 