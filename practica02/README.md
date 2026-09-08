# Práctica 2 - El Mostrador de la Biblioteca

## Preguntas de la tarea

### 1. ¿Por qué una unión de valores y no una enumeración?
Por que una union de valores es un solo tipo y el valor sigue siendo un string normal, aparte de que desaparece al igual que el resto de las anotaciones al compilar, en cambio un enum si genera un objeto real en la compilación, lo que agrega codigo extra y compeljidad innecesarias al código cuando un comando mas simple se puede usar.

### 2. ¿Qué se gana con el tipo desconocido (unknown) en lugar del que acepta todo (any)?
Por que el tipo 'unknown' obliga a comprobar la forma del valor antes de poder usarse, mientras que 'any' no tiene esa "garantía" y puede causar errores más adelante

### 3. ¿Por qué la fecha entra como parámetro?
Porque si la función calculara la fecha de hoy por su cuenta con new Date(), no habría forma de probarla con otra fecha. Al recibir la fecha como parámetro, puedo simular mas escenarios, como un préstamo ya vencido, sin esperar 14 días reales. Así como lo hice en la comprobacion en las evidencias '07-1' y '07-2'.