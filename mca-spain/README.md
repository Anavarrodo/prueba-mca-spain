# mca-spain

- [mca-spain](#mca-spain)
  - [Control de cambios](#control-de-cambios)
  - [Necesidades](#necesidades)
  - [Descripción](#descripción)
  - [npm start](#npm-start)
  - [Desarrollo](#desarrollo)
    - [assets](#assets)
    - [components](#components)
    - [containers](#containers)
    - [views](#views)
    - [context](#context)
    - [hooks](#hooks)
    - [services](#services)
    - [utils](#utils)
  - [Gestor de Dependencias](#gestor-de-dependencias)
    - [testing](#testing)
          - [npm test](#npm-test)
    - [axios](#axios)
    - [prettier-eslint](#prettier-eslint)
          - [npm lint](#npm-lint)
    - [react-lazyload](#react-lazyload)
    - [react-lottie](#react-lottie)
    - [styled-components](#styled-components)
  - [npm run build](#npm-run-build)

## Control de cambios

| Fecha      | Versión | Estado | Modificado               |
| :--------- | :------ | :----- | :----------------------- |
| 04/04/2022 | 1.0.0   | OK     | a.navarrodo@gmail.com |

## Necesidades

Simulación de una tienda de dispositivos móviles a través de una mini-aplicación creada con React.js

- Listado de productos (obligatorio).
- Detalle del producto (obligatorio).
- Información del carrito de la compra.
- Diseño a libre elección.

Puntos a destacar:

- React.js (Obligatorio).
- JS con ES6.
- Libertad en el stack usado en la prueba.
- Repositorio: <https://github.com/Anavarrodo/prueba-mca-spain/tree/master/mca-spain>

## `npm start`

Ejecuta la aplicación en el modo de desarrollo
Una vez hecho esto el proyecto debería ser accesible vía navegador en [http://localhost:3000](http://localhost:3000)

## Desarrollo

He seguido la metodología Atomic Design; es decir, un sistema de trabajo que se basa en la creación de elementos modulares sencillos para crear estructuras de información mucho más complejas.

### assets

Formado por tres carpetas internas:
    - animations: incluye un archivo json con la animación del componente de carga.
    - fonts: fuentes que se han utilizado en este proyecto ('Montserrat').
    - svg: incluye archivos .js con los iconos.

### components

Carpeta donde se encuentran todos los componentes creados para esta mini-aplicación. Podemos encontrar desde un componente muy pequeño como es el Text.js hasta uno más complejo como puede ser el Dropdown.js
Todos estos componentes pueden ser reutilizados en todas las vistas ( en el contexto de uso de esta app ).

### containers

Módulos estructurales de pequeñas mini-secciones formados por los distintos componentes.

### views

Carpeta donde incluyen las vistas de esta aplicación.
En este caso nos encontramos con dos únicas vistas: Listado de producto y detalle del producto.

### context

Se ha creado la necesidad de usar el contexto para poder almacemar el estado de la aplicación.
En este caso guardamos la información del carrito de la compra para que nos sea accesible desde cualquier vista.

### hooks

He creado dos Custom Hooks para los casos de lógica repetitiva como son el guardar los datos en sesión con localStorage y los cambios de renderizado según la resolución de pantalla.

### services

En esta carpeta se incluyen los archivos donde se definen la consumición de las apis.
La integración se ha hecho para tres endpoints:
    - GET / Obtener el listado de productos: <https://front-test-api.herokuapp.com/api/product>.
    - GET / Obtener el detalle del producto: <https://front-test-api.herokuapp.com/api/product/:id>.
    - POST / Añadir producto a la cesta: <https://front-test-api.herokuapp.com/api/cart>.

### utils

Como su propio nombre indica, es la carpeta de utilidades. En ella podemos encontrar constantes de colores que se han usado en toda la aplicación, funciones y rutas.

## Gestor de dependencias

El gestor de dependencias usado ha sido **npm**.

```` json
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.2",
    "@testing-library/react": "^12.1.3",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.26.0",
    "prettier-eslint": "^13.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-lazyload": "^3.2.0",
    "react-lottie": "^1.2.3",
    "react-redux": "^7.2.6",
    "react-router-dom": "^5.3.0",
    "react-scripts": "5.0.0",
    "styled-components": "^5.3.3",
    "web-vitals": "^2.1.4"
  }
````

### testing

Librerías de testing (**Jest**) generadas por defecto con React Create App.

#### `npm test`

Inicia el corredor de prueba en el modo de reloj interactivo.

### axios

Es una librería que a modo de cliente nos permite hacer peticiones HTTP a un servidor, las tareas son realizadas por medio del objeto Promise() de JavaScript.

### prettier-eslint

ESLint es un linter de código JavaScript. Su función es analizar el código de nuestra aplicación, detectar problemas en por medio de patrones y si esta a su alcance resolverlos él mismo. Por otro lado, Prettier es un formateador de código. Tambien analiza nuestro código JavaScript.

#### `npm lint`

Lanzar este comando para ejecutar las herramienta de "linting".

### react-lazyload

Dependencia utilizada para la carga de imágenes en la vista de Lista de productos.

### react-lottie

Dependencia utilizada para exportar animaciones como JSON. Usado en el componente Loading.js para mostrarse durante la carga de datos.

### styled-components

Librería que nos permite estilizar nuestros componentes y al mismo tiempo que definimos sus estilos, podemos también condicionarlos a las propiedades que queramos.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.
Empaqueta correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.
