# Práctica 16 - El Gimnasio: sesión con contexto y JWT
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea


### 1. ¿Por qué se usa un contexto y no props para la sesión?
> Porque la sesión la necesitan componentes en distintos niveles, como **Encabezado**, **PaginaEntrar** y **PaginaRegistro**. Con props, cada componente intermedio tendría que recibirla solo para pasarla hacia abajo. Con **SesionContext**, cualquier componente dentro de **ProveedorSesion** la lee directamente con **useSesion()**, como se vio en el encabezado.

### 2. ¿Qué pasa si un componente usa la sesión fuera del proveedor?
> useContext devuelve **null** y el hook **useSesion** lanza un error indicando que debe usarse dentro de **ProveedorSesion**, como se definió en **SesionContext.tsx**. Así el problema se detecta al renderizar y no después, con datos vacíos. Por ejemplo, si en **main.tsx** el proveedor no envolviera a App, el Encabezado fallaría desde la primera carga.

### 3. ¿Dónde se guarda el token y qué riesgo tiene ese lugar?
> Se guarda en **localStorage**, junto con los datos del usuario, para que la sesión sobreviva al recargar la página. El riesgo es que cualquier JavaScript que se ejecute en la página puede leerlo, por lo que un ataque XSS podría robarlo. Con el token, alguien podría actuar como esa persona hasta que expire. Una alternativa más segura es una cookie **httpOnly**, que el JavaScript no puede leer.