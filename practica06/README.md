# Práctica 6 - Conectar el Dominio con la API
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea

### 1. ¿Qué pasaría si el modulo no quedara registrado en la raíz?
> Si el modulo no queda registrado en _'app.module.ts'_, Nest nunca se entera de que _'ClaseController'_ existe. Lo comprobé comentando _'ClasesModule'_ de los imports, y al querer ingresar al subdominio de _/clases_ la API respondió con un _Error 404 'Not Found'_.

### 2. ¿Por qué los métodos del repositorio devuelven promesas si los datos van a estar en memoria?
> Los métodos devuelven 'Promise' por que la interfaz no sabe (ni debe saber) si detrás hay un arreglo en memoria o un a base de datos real. Si hoy los metodos fueran síncronos y mañana cambiáramos a MySQL (que si necesita 'await'), tendriamos que modificar la interfaz y todo el código que depende de ella.

### 3. ¿Qué error aparecio al mover la interfaz, y por qué la clase si se había resuelto sola?
> Al cambiar el tipo del parámetro a la interfaz _'InscripcionRepository'_, Nest falló al arrancar con _'UnknownDependenciesException'_, indicando que no puede resolver la dependencia en el índice[0] del constructor. Esto pasa por que las interfaces de TypeScript no existen en el JavaScript compilado, ya que desaparecen al igual que cualquier anotación de tipo.
> Nest usa el tipo del parámetro como "token" para saber qué inyectar; como la interfaz ya no está en el .js, no tiene ningún provider asociado. En cambio, con la clase concreta (_'InscripcionMemoriaRepository'_) sí se resolvió sola, porque las clases sí sobreviven a la compilación y Nest puede usarlas directamente como token.

### 4. ¿Por qué el servicio necesita un token para el repositorio, pero el controlador no lo necesita para el servicio?
> El servicio necesita un token porque _'InscripcionRepository'_ es una interfaz y desaparece al compilar, así que Nest no tiene ningún valor real que usar como identificador. El controlador, en cambio, inyecta _'InscripcionesService'_, que es una clase real y sí sobrevive a la compilación por lo que Nest puede usarla directamente como token, sin necesidad de @Inject.

### 5. ¿Cuál es la diferencia entre un error 400 y un 409?
> Un 400 (Bad Request) significa que la petición en sí está mal formada, le faltan datos, o vienen con el tipo equivocado, en otras palabras, el servidor ni siquiera puede entender qué le están pidiendo. Un 409 (Conflict) significa que la petición está bien formada y se entiende perfectamente, pero choca con el estado actual del sistema, como pedir un horario que ya está lleno, o inscribir a alguien que ya está inscrito. El 400 pasa antes de tocar la lógica de negocio; el 409 pasa después, cuando esa lógica ya evaluó la petición y encontró que rompe una regla.

### 6. ¿Por qué cambió el código de estado en esa ultima petición?
> Cambió porque al cancelar la inscripcion del miembro 1, las inscripciones confirmadas en el horario 1 bajaron de 2 a 1, por lo que el horario dejo de estar "lleno" ya que el cupo maximo es de 2. La regla de cupo en el servicio solo cuenta las inscripciones con estado "confirmado" y una "cancelada" no forma parte de ese conteo, tambien es por esto que paso de un estado 409 (error de logica de negocio por que el horario estaba lleno) a estado 201 (creado sin problemas debido a que hay vacancia en el horario).