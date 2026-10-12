# Práctica 10 - Blindar la API, JWT y OpenAPI
> Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas Parte 1

### 1.1. ¿por qué el filtro atrapa la clase base y no cada error por separado?
> 

### 1.2. ¿por qué este middleware no podría decidir si un usuario tiene permiso para una ruta?
> 

### 1.3. ¿por qué la petición que responde 409 no aparece en ese registro?
> 

### 1.4. ¿por qué este cambio rompe a cualquier cliente que ya estuviera usando la API?
> 

### 1.5. Si el servidor respondió en los dos casos, ¿quién bloquea y a quién protege
> 

## Preguntas Parte 2

### 2.1. ¿por qué el campo se llama passwordHash y no password?
> 

### 2.2. ¿por qué los dos errores del inicio de sesión dicen exactamente lo mismo?
> 

### 2.3. Si el contenido se puede leer, ¿qué es lo que protege la firma?
> 

### 2.4. ¿por qué es más seguro proteger todo y abrir a mano, que al revés?
> 

### 2.5. ¿cuál es la diferencia entre un 401 y un 403?
>

### 2.6. ¿cuántas líneas del AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?
>

### 2.7. ¿por qué es importante tomar al usuario de los claims del token y no de un parámetro de la URL o del cuerpo? Da un ejemplo concreto de qué pasaría si la API confiara en algo como GET /miembros/3/inscripciones o en el miembroId del cuerpo sin compararlo contra el token. Explica qué claim se usa y por qué el cliente no puede falsificarlo
>