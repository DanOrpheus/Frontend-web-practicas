# Práctica 8 - Prisma: Esquema, Migraciones y MySQL
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea

### 1. ¿Por qué el paquete del adaptador se llama adapter-mariadb si usamos MySQL?
> El paquete se llama **_adapter-mariadb_** porque MySQL y MariaDB comparten el mismo protocolo de comunicación de red (MariaDB nació como un fork de MySQL y mantuvo compatibilidad total con su protocolo). Por eso Prisma usa un solo adaptador para ambos motores, en vez de mantener uno distinto para cada uno.

### 2. ¿editar schema.prisma cambió algo en la base de datos antes de migrar?
> No. Editar **_schema.prisma_** solo cambia un archivo de texto en el proyecto, no toca la base de datos para nada. 
La tabla clases no existió hasta que se utiliza el comando **_'npx prisma migrate dev'_**, que fue el que generó el .sql y lo ejecutó dentro de MySQL. 
El esquema es la intención de cómo se quiere que se vea la base; la migración es la acción que de verdad la cambia.

### 3. ¿La carpeta de migraciones es una foto del esquema o un historial?
> Es un historial, no una foto. La carpeta del init no se borró ni se sobrescribió al agregar la descripción, ahora hay dos carpetas, una por cada cambio que se hizo, en el orden en que ocurrieron. 
La segunda migración ni siquiera repite el **_CREATE TABLE_** completo: solo tiene el **_ALTER TABLE_** con el cambio puntual. 
Esto significa que Prisma no solo sabe cómo se ve la base hoy, sino cómo se fue llegando a ese estado, paso por paso.

### 4. ¿Por qué Horario.clase sí crea columna y Clase.horarios no?
> **_Horario.clase_** sí crea columna porque trae la anotación **_@relation(fields: [claseId], references: [id])_**, que le dice a Prisma exactamente qué columna real (_claseId_) usar para guardar la relación y esa columna sí vive en la tabla horarios. **_Clase.horarios_**, en cambio, no declara ningún _@relation_ propio: es solo el lado inverso, una lista que Prisma arma al vuelo buscando en horarios las filas cuyo _claseId_ coincida con el id de la clase. 
En una relación uno a muchos solo hace falta una columna (del lado de "muchos"), así que clases no necesita ninguna columna nueva para esto.

### 5. ¿De dónde sale la relación de muchos a muchos entre Miembro y Horario, si nunca se declaró?
> No se declaró directamente, pero surge de las dos relaciones uno a muchos que sí declaré en **Inscripcion**: una hacia **Horario** (por **_horarioId_**) y otra hacia **Miembro** (por **_miembroId_**). La tabla **inscripciones** funciona como tabla intermedia: cada fila conecta un horario con un miembro. Como un horario puede tener muchas inscripciones, y un miembro también puede tener muchas inscripciones, en conjunto eso arma una relación de muchos a muchos entre **Horario*** y **Miembro**, un miembro puede estar en varios horarios, y un horario puede tener varios miembros, todo pasando a través de **inscripciones**. La diferencia con un muchos a muchos "directo" en Prisma es que aquí la tabla intermedia tiene sus propios datos (_estado_, _creadaEn_), no es solo una tabla de cruce vacía.