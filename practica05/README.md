# Práctica 5 - Mi Primera API con NestJS
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea

### 1. ¿Qué generó el comando 'nest new'?
> Generó lo ue es básicamente un esqueleto funcional de un proyecto NestJS, listo para correr y con su carpeta _'src/'_ con el modulo raíz, un controlador, y servicio de ejemplo.

### 2. ¿Qué hace el AppService que ya viene generado?
> El AppService generado tiene un solo método,_'getHello()'_ que regresa el texto 'Hello World!'. Su propósito es mostrar el patrón que usa Nest para separar responsabilidades: el controlador (AppController) solo maneja la ruta HTTP y delega el trabajo real al Servicio, en vez de hacerlo él mismo. El decorador @Injectable() permite que Nest inyecte automáticamente una instancia de AppService en el constructor del controlador, sin que tenga que crearla manualmente.

### 3. ¿Por que la ruta funciona sin declarar nada en 'app.module.ts'?
> Porque AppController ya estaba registrado en app.module.ts desde que se generó el proyecto con 'nest new'. Nest escanea automáticamente todos los métodos del controlador que tengan un decorador de ruta (@Get, @Post, etc.) y los registra al arrancar, como se ve en la terminal (_'Mapped {/clases, GET} route'_, tal como se ve en las evidenias 01 y 02). Como solo agregué un método nuevo dentro de una clase que el módulo ya conocía, no hizo falta declarar nada extra en app.module.ts.

### 4. ¿Qué pasaría si el cuerpo de la petición viniera vacío?
> Si el cuerpo de la petición viene vacío, el programa no lo rechaza ni lanza ningún error, como _'@Body() cuerpo: { nombre: string }'_ es solo un tipo de TypeScript y no hay validación real en tiempo de ejecución, Nest simplemente toma lo que llegó (un objeto vacío) y sigue con la lógica normal. El resultado es que se crea una clase nueva con nombre: _undefined_ (o _null_ al convertirse a JSON), lo cual "funciona" pero deja un dato incompleto guardado en el arreglo, sin ningún aviso de que algo salió mal.

### 5. ¿En que archivo vive hoy toda la lógica de la práctica?
> Actualmente toda la lógica vive en el archivo _'app.controller.ts'_, debido que aqui es donde se genera todo el arreglo de clases, rutas y demás. El archivo _'main.ts'_ es prácticamente para 'arrancar' el servidor y el archivo _'app.service.ts'_ es autogenerado cuando se crea el proyecto y no se suele usar fuera de la prueba de _'Hello World'_.