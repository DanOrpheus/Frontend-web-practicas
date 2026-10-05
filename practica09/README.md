# Práctica 9 - Blindar la API
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea

### 1. ¿Qué línea del Service o del Controller tuvo que cambiar para que Clases hablara con MySQL?
> Ninguna línea. Ni **_ClasesService_** ni **_ClasesController_** cambiaron en absoluto. El único archivo que cambió fue **clases.module.ts**, en el _useClass_ del provider, de **_ClaseMemoriaRepository_** a **_ClasePrismaRepository_**. Esto es justo el punto de usar una interfaz con token desde la práctica 6: el _Service_ solo conoce **_ClaseRepository_** (la interfaz), nunca supo que detrás había un arreglo en memoria, así que tampoco le importa que ahora haya una base de datos real.

### 2. ¿Por qué InscripcionesService no tuvo que cambiar ni una línea de las reglas de cupo y duplicados?
> **_InscripcionesService_** no cambió ni una línea porque sus reglas de negocio (el cupo máximo, no repetir inscripción) solo dependen de los datos que le entrega el repositorio a través de la interfaz **_InscripcionRepository_** — nunca supo, ni le importó, si esos datos venían de un arreglo en memoria o de una consulta real a MySQL. Lo único que cambió fue **_inscripciones.module.ts_**, en el _useClass_ del provider, de **_InscripcionMemoriaRepository_** a **_InscripcionPrismaRepository_**. Las pruebas lo confirman: corrí la misma batería de peticiones de la práctica 6 (los dos 201, los dos 409, la cancelación y el reintento con 201) y obtuve exactamente los mismos códigos de estado que antes, aunque ahora los datos viven en una base de datos real.

### 3. ¿Por qué una interfaz no puede validar nada en tiempo de ejecución?
> 

### 4. ¿Qué código de estado responde y qué trae en el cuerpo?
> 

### 5. ¿Cuántas líneas quedó más corto el controlador?
> 

### 6. Si la respuesta llega en los dos casos, ¿Quién bloquea realmente y a quién protege?
> 