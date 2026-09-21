# Práctica 5 - Mi Primera API con NestJS
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea

### 1. ¿Qué generó el comando 'nest new'?
> Generó lo ue es básicamente un esqueleto funcional de un proyecto NestJS, listo para correr y con su carpeta _'src/'_ con el modulo raíz, un controlador, y servicio de ejemplo.

### 2. ¿Qué hace el AppService que ya viene generado?
> 

### 3. ¿Por que la ruta funciona sin declarar nada en 'app.module.ts'?
> Porque AppController ya estaba registrado en app.module.ts desde que se generó el proyecto con 'nest new'. Nest escanea automáticamente todos los métodos del controlador que tengan un decorador de ruta (@Get, @Post, etc.) y los registra al arrancar, como se ve en la terminal (Mapped {/clases, GET} route, tal como se ve en las evidenias 01 y 02). Como solo agregué un método nuevo dentro de una clase que el módulo ya conocía, no hizo falta declarar nada extra en app.module.ts.

### 4. ¿En que archivo vive hoy toda la lógica de la práctica?
> 

