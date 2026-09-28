# Práctica 7 - Construir el módulo de Miembros
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea

### 1. ¿Por qué esta interfaz no menciona Express, NestJS ni memoria?
> Porque la interfaz solo describe qué se puede hacer con los miembros (listar, buscar, crear, actualizar, eliminar), no cómo ni dónde se hace. No importa nada de Express ni de NestJS porque no tiene nada que ver con peticiones HTTP, y tampoco menciona memoria porque no sabe dónde viven los datos. Así, inicialmente puede haber un arreglo en memoria detrás y luego puede agregarse una base de datos, y el resto del código (Service y Controller) no se entera del cambio.

### 2. ¿Qué palabra de esa clase es la que promete cumplir la interfaz del paso anterior?
> La palabra es __'implements'__. Al escribir class __'MiembroMemoriaRepository implements MiembroRepository'__, la clase se compromete a tener todos los métodos que declara la interfaz, con los mismos nombres, parámetros y tipos de retorno. Si falta alguno o no coincide, TypeScript marca error al compilar. Por eso se puede cambiar esta clase por otra (por ejemplo una que use base de datos) sin tocar el resto del código.

### 3. ¿Por qué este archivo no sabe qué es una petición HTTP?
> Porque el Service solo recibe datos simples (un id, un DTO) y devuelve datos simples (un miembro, una lista, un booleano). No importa nada de Express ni maneja __Request__, __Response__, cabeceras o códigos de estado. Su trabajo es delegar la operación al repositorio, y del HTTP se encarga el Controller. Gracias a eso el Service podría usarse igual desde otro lugar, como un script o una prueba, sin necesitar un servidor web.

### 4. ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?
> Porque __'MiembrosService'__ es una clase, y las clases sí existen al compilar a JavaScript, así que Nest la usa a ella misma como identificador para saber qué inyectar en el Controller. __'MiembroRepository'__, en cambio, es una interfaz, y las interfaces desaparecen al compilar, por lo que Nest no tendría nada con qué identificarla. Por eso el repositorio necesita un token (__MIEMBRO_REPOSITORY__) con __@Inject__, y en el módulo se le indica qué clase concreta usar

### 5. ¿Qué prueba, en los hechos, que agregar Miembros no rompió nada de Inscripciones?
> Lo prueba que las mismas peticiones de Inscripciones de la práctica 6 siguen respondiendo exactamente igual con Miembros ya agregado: los 201 al inscribir, los dos 409 (cupo lleno y duplicada), y la cancelación seguida de una nueva inscripción exitosa. Cada módulo tiene su propio repositorio, su propio token y sus propios providers, así que no comparten estado ni dependencias.