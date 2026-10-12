# Práctica 10 - Blindar la API, JWT y OpenAPI
> Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas Parte 1

### 1.1. ¿por qué el filtro atrapa la clase base y no cada error por separado?
> Porque los cuatro errores (**HorarioNoEncontradoError, MiembroNoEncontradoError, CupoLlenoError e InscripcionDuplicadaError**) heredan de la misma clase base ErrorDeDominio, y el decorador **@Catch(ErrorDeDominio)** atrapa cualquier instancia de esa clase o de sus hijas. Con eso un solo filtro, **DominioExceptionFilter**, cubre a todos en vez de tener uno por cada error. Dentro del filtro lo único que se decide es el código de estado: 404 para los errores de “no encontrado”, 409 para cupo lleno y duplicados, y 500 por si llega otro error de dominio que no esté contemplado. Esto es útil porque si mañana agrego un quinto error, basta con que extienda ErrorDeDominio y el filtro lo atrapa solo, sin crear otro filtro ni tocar el controlador. Además, las reglas de negocio se quedan en el dominio sin saber nada de HTTP, y la traducción a códigos de estado vive en un solo lugar.

> _Imagen en Evidencias:_ **1.1 - InscripcionDuplicadaNuevoFiltro.png**

### 1.2. ¿por qué este middleware no podría decidir si un usuario tiene permiso para una ruta?
> Porque un middleware corre antes de que Nest sepa qué controlador y qué método va a atender la petición, así que no tiene acceso a su contexto de ejecución ni a metadatos como **@Roles()** o **@Publico()**. Solo ve la petición cruda (req, res). Por eso los permisos se deciden en un Guard, que sí conoce la ruta destino y puede leer esos metadatos con el Reflector.

> _Imagen en Evidencias:_ **1.2 - PeticionX-Request-Id.png**

### Experimento 01 - ¿Que pasa si _next()_ es comentado?
> Al comentar _next()_ la petición se quedó cargando sin respuesta hasta el timeout. Pasa porque el middleware es un eslabón de la cadena: si no llama a _next()_, nunca le pasa el control al siguiente, y la petición jamás llega al controlador.

> _Imagen en Evidencias:_ **1.2 - Exp01 - nextComentadoTimeout.png**

### 1.3. ¿por qué la petición que responde 409 no aparece en ese registro?
> Porque el _tap_ solo corre cuando el flujo termina con éxito. En el 409, el servicio lanza un error de dominio, y el flujo termina en error en vez de emitir un valor, así que el _tap_ nunca se ejecuta. Para registrar también los errores se tendría que usar **catchError** o la versión de _tap_ con el callback de error.
> _Imagen en Evidencias:_ **1.3 - LogInterceptorTerminal.png**

### 1.4. ¿por qué este cambio rompe a cualquier cliente que ya estuviera usando la API?
> Porque cambia la forma de la respuesta: antes el cliente recibía directamente el arreglo o el objeto, y ahora lo que busca está dentro de **data**. Cualquier código que haga algo como _respuesta[0]_.nombre va a fallar, porque ahora tendría que ser _respuesta.data[0]_.nombre. Es un cambio incompatible hacia atrás, por eso en una API real esto se haría con una nueva versión o avisando a los clientes antes.

> _Imagen en Evidencias:_ **1.4 - SobreInterceptor.png**

### 1.5. Si el servidor respondió en los dos casos, ¿quién bloquea y a quién protege
> El servidor no bloquea nada: en los dos casos respondió 200 con los datos. La diferencia es que con el origen no permitido la respuesta no trae **Access-Control-Allow-Origin**, y quien bloquea es el navegador: al ver que el header no coincide con su origen, descarta la respuesta y no se la entrega al JavaScript de la página. REST Client no es un navegador, por eso no le afecta. CORS protege al usuario, no al servidor, evitando que un sitio ajeno lea datos de la API desde el navegador de alguien.

> _Imagen en Evidencias:_ **1.5.1 - CORSOrigenPermitido.png** y **1.5.2 - CORSOrigenNoPermitido.png**

## Preguntas Parte 2

### 2.1. ¿por qué el campo se llama passwordHash y no password?
> Porque lo que se guarda nunca es la contraseña real, sino su hash de bcrypt, que es de un solo sentido y no se puede revertir. Si alguien roba la base de datos solo ve hashes, no las contraseñas.

### 2.2. ¿por qué los dos errores del inicio de sesión dicen exactamente lo mismo?
> Para no darle pistas a un atacante. Si el mensaje fuera distinto para “correo no existe” y “contraseña incorrecta”, podría probar correos hasta saber cuáles están registrados. Con el mismo 401 “Credenciales invalidas” no puede distinguir cuál de las dos falló.

### 2.3. Si el contenido se puede leer, ¿qué es lo que protege la firma?
> La firma protege la integridad, no la privacidad. El payload solo está en base64 y cualquiera lo puede leer, pero si alguien lo modifica (por ejemplo rol: “admin”) la firma deja de coincidir y el servidor lo rechaza. Solo quien conoce JWT_SECRET puede generar una firma válida.

> _Imagen en Evidencias:_ **2.3.1 - AuthLoginKarla.png** y **2.3.2 - DecodedAccessTokenPayload.png**

### 2.4. ¿por qué es más seguro proteger todo y abrir a mano, que al revés?
> Porque si lo abierto es el default, cualquier ruta nueva que se me olvide proteger queda expuesta sin que nadie lo note. Si todo está protegido por defecto y abro con @Publico() a mano, el olvido falla de forma segura: la ruta da 401 y se nota al instante.

> _Imagen en Evidencias:_ **2.4.1 - PublicoSinToken401.png** y **2.4.2 - PublicoSinToken200.png**

### 2.5. ¿cuál es la diferencia entre un 401 y un 403?
> 401 es que el servidor no sabe quién eres (no mandaste token, o es inválido o venció). 403 es que sí sabe quién eres, pero no tienes permiso para esa acción. Karla sin token recibe 401; Karla con token intentando inscribir a Sofía recibe 403.

> _Imagen en Evidencias:_ **2.5.1 - InscripcionKarlaConToken.png** y **2.5.2 - InscripcionTokenKarlaAOtraPersona.png**

### 2.7. ¿cuántas líneas del AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?
> Ninguna línea del AuthService. Solo cambió una línea en auth.module.ts, el useClass del provider, de UsuarioMemoriaRepository a UsuarioPrismaRepository. El service solo conoce la interfaz UsuarioRepository por su token, así que no sabe si los usuarios viven en un arreglo o en MySQL.

> _Imagen en Evidencias:_ **2.7.1 - UsuarioCreadoPruebaPersistencia.png**, **2.7.2 - LoginUsuarioNuevoPersistencia.png** y **2.7.3 - MigrationAgregarUsuario.png**

### 2.8. ¿por qué es importante tomar al usuario de los claims del token y no de un parámetro de la URL o del cuerpo? Da un ejemplo concreto de qué pasaría si la API confiara en algo como GET /miembros/3/inscripciones o en el miembroId del cuerpo sin compararlo contra el token. Explica qué claim se usa y por qué el cliente no puede falsificarlo
> Porque el token va firmado con **JWT_SECRET** y el cliente no puede cambiarlo sin invalidar la firma, mientras que un parámetro de la URL o un campo del body lo escribe el propio cliente. Por ejemplo, en **GET /miembros/3/inscripciones** o en un **POST** con **miembroId: 3** sin compararlo con el token, Karla podría poner el 3 y actuar a nombre de Sofía. Por eso uso el **claim miembroId** del token: si lo altera, la firma no coincide y el Guard responde con estado 401.

> _Imagen en Evidencias:_ **2.8.1 - EliminarInscripcionSinToken.png**, **2.8.2 - EliminarInscripcionConTokenIncorrecto.png** y **2.8.3 - EliminarInscripcionConTokenCorrecto.png** 
