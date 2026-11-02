# Práctica 15 - El Gimnasio, Rutas y Layouts
Hecho por **Daniel Gutiérrez Flores - _00000132987_**


## Preguntas de la tarea



### 1. ¿Por qué el 404 sí tiene encabezado y pie?
> Porque la ruta **path="*"** se definió como hija de la ruta de layout, como se vio en **App.tsx**. Por eso NoEncontrado se pinta dentro del **<Outlet />** de Layout, que ya incluye Encabezado y PiePagina. Si la ruta estuviera fuera del layout, la página de error aparecería sin menú, y la persona no tendría cómo regresar al catálogo.

### 2.¿Qué cambia en la pestaña Red si usas _<a href>_ en lugar de Link?
> Con Link, React Router solo cambia la URL y pinta la otra página, así que en Red únicamente aparecen las peticiones a la API. Con **_<a href>_**, el navegador recarga el documento completo: aparece una petición de tipo document, se descargan de nuevo el JS y el CSS, y se pierde el estado de la aplicación. Esto se muestra en las capturas de la carpeta evidencias/.

### 3.¿En qué tipo de dato llega el id de la URL y qué pasa si no lo conviertes?
> Llega como string, porque **_useParams_** siempre devuelve texto, como se manejó en PaginaClase. Si no se convierte con **Number(id)**, TypeScript no permite pasarlo a traerClase, que espera un _number_. Además, en JavaScript **"1" === 1** es falso, por lo que cualquier comparación con el id fallaría.

### 4.¿Qué pasa al ir de /clases/1 a /clases/2 si el id no está en las dependencias del efecto?
> React Router reutiliza el mismo componente **PaginaClase** y no lo desmonta, y sin el id en el arreglo el efecto no se vuelve a ejecutar. La URL cambia a **/clases/2**, pero la pantalla sigue mostrando la clase 1. Como se vio en el hook useClase, al incluir **[id]** el efecto se repite y la limpieza descarta la respuesta anterior.