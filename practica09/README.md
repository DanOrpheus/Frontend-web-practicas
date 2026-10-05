# Práctica 9 - Blindar la API
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea

### 1. ¿Qué línea del Service o del Controller tuvo que cambiar para que Clases hablara con MySQL?
> Ninguna línea. Ni **_ClasesService_** ni **_ClasesController_** cambiaron en absoluto. El único archivo que cambió fue **clases.module.ts**, en el _useClass_ del provider, de **_ClaseMemoriaRepository_** a **_ClasePrismaRepository_**. Esto es justo el punto de usar una interfaz con token desde la práctica 6: el _Service_ solo conoce **_ClaseRepository_** (la interfaz), nunca supo que detrás había un arreglo en memoria, así que tampoco le importa que ahora haya una base de datos real.

### 2. ¿Por qué InscripcionesService no tuvo que cambiar ni una línea de las reglas de cupo y duplicados?
> **_InscripcionesService_** no cambió ni una línea porque sus reglas de negocio (el cupo máximo, no repetir inscripción) solo dependen de los datos que le entrega el repositorio a través de la interfaz **_InscripcionRepository_** — nunca supo, ni le importó, si esos datos venían de un arreglo en memoria o de una consulta real a MySQL. Lo único que cambió fue **_inscripciones.module.ts_**, en el _useClass_ del provider, de **_InscripcionMemoriaRepository_** a **_InscripcionPrismaRepository_**. Las pruebas lo confirman: corrí la misma batería de peticiones de la práctica 6 (los dos 201, los dos 409, la cancelación y el reintento con 201) y obtuve exactamente los mismos códigos de estado que antes, aunque ahora los datos viven en una base de datos real.

### 3. ¿Por qué una interfaz no puede validar nada en tiempo de ejecución?
> Porque una interfaz es pura información para el compilador y desaparece por completo al transpilar a JavaScript, igual que vimos con **_readonly_** y las uniones de tipos desde la práctica 2. En tiempo de ejecución, cuando una petición real llega al servidor, no queda ningún rastro de la interfaz para comparar contra ella. Una clase, en cambio, sí existe como código real en el **.js** compilado, así que **class-validator** puede inspeccionar sus decoradores (**@IsString()**, **@IsInt()**, etc.) en ese momento y comprobar si los datos que llegaron cumplen con lo que se espera.

### 4. ¿Qué código de estado responde y qué trae en el cuerpo?
> Responde con un estado **400 Bad Request**, con un cuerpo que trae tres campos: **message** (un arreglo de strings, uno por cada error de validación — por ejemplo _"cupoMaximo must be an integer number"_), **error** (el texto _"Bad Request"_), y **statusCode** (_400_). Si el problema es un campo con el tipo equivocado, el mensaje describe qué se esperaba; si es un campo que no existe en el DTO, el mensaje dice _"property X should not exist"_, gracias a _forbidNonWhitelisted_.

### 5. ¿Cuántas líneas quedó más corto el controlador?
> El bloque **try/catch** que capturaba y traducía los errores manualmente tenía 12 líneas; después de moverlo al filtro global, quedó en 3 líneas y el controlador quedó 9 líneas más corto. Además, ya no necesita importar los 4 errores de dominio ni **ConflictException**, porque esa responsabilidad vive ahora en un solo lugar (**FiltroErroresDominio**), en vez de repetirse en cada controlador que necesite traducir errores.

### 6. Si la respuesta llega en los dos casos, ¿Quién bloquea realmente y a quién protege?
> El servidor nunca bloquea nada, en ambos casos respondió con estado 200 con los datos completos, como se ve en las capturas. La diferencia es que, para el origen no permitido, la respuesta no trae el header **Access-Control-Allow-Origin**. El bloqueo real lo hace el navegador, no el servidor: cuando código JavaScript está corriendo en una página, intenta leer la respuesta de un fetch a la API, el navegador revisa si ese header coincide con su propio origen, si no coincide o no existe, el navegador descarta la respuesta y nunca se la entrega al código JavaScript que la pidió, aunque la petición ya haya llegado y el servidor ya haya respondido completo, como se mostró en las pruebas con REST Client (que al noser un navegador, no se ve afectado por esta restricción). CORS protege al usuario, no al servidor: evita que un sitio malicioso use la sesión ya iniciada del usuario en tu navegador para leer datos de otra API en su nombre, sin su consentimiento.