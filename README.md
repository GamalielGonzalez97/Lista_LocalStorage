# Mi lista de tareas

Aplicación web sencilla para crear y organizar tareas pendientes directamente desde el navegador.

## Qué hace

- Permite escribir y agregar nuevas tareas.
- Muestra el número de tareas pendientes.
- Permite marcar una tarea como completada haciendo clic sobre ella.
- Muestra las tareas completadas con texto tachado y menor opacidad.
- Permite eliminar tareas individualmente.
- Conserva las tareas, incluyendo su estado de completado, usando `localStorage`.
- Se adapta a pantallas de escritorio y dispositivos móviles.

## Tecnologías utilizadas

- HTML5 para la estructura de la aplicación.
- CSS3 para los estilos y el diseño adaptable.
- JavaScript para la interacción y la gestión de tareas.
- `localStorage` para guardar los datos localmente en el navegador.

## Cómo usarlo

1. Abre el archivo `index.html` en un navegador web.
2. Escribe una tarea en el campo de texto.
3. Pulsa **Agregar tarea**.
4. Haz clic sobre una tarea para cambiarla entre pendiente y completada.
5. Pulsa **Eliminar** para quitar una tarea.

No es necesario instalar dependencias ni ejecutar un servidor para utilizar la aplicación.

## Estructura del proyecto

```text
mi-lista-tareas/
├── index.html   # Estructura de la página y formulario
├── style.css    # Estilos y diseño adaptable
├── script.js    # Lógica para crear, completar, eliminar y guardar tareas
└── README.md    # Documentación del proyecto
```

## Almacenamiento de datos

Las tareas se guardan en el almacenamiento local del navegador con la clave `mi-lista-tareas`. Esto significa que:

- Las tareas permanecen al cerrar y volver a abrir la página en el mismo navegador.
- Los datos no se envían a un servidor.
- Las tareas no se sincronizan automáticamente entre dispositivos o navegadores.
- Si se borran los datos del navegador, también se borrarán las tareas guardadas.

## Licencia

Este proyecto es de uso libre para fines personales y educativos.
