# Bad-jokes-io

## Descripción
Bad-jokes-io es una aplicación que permite a los usuarios explorar, interactuar y gestionar una colección de chistes. La aplicación está diseñada con una interfaz intuitiva y moderna.

## Funcionalidades principales

### 1. Tabla de chistes
- Permite filtrar y ordenar los chistes.
- Incluye paginación para mostrar 10 resultados por página.

### 2. Swiper de chistes
- Una interfaz interactiva donde los usuarios pueden deslizar chistes para indicar si les gustan o no.

### 3. Sección de favoritos
- Muestra los chistes que te han gustado y los que no.
- Incluye la opción de limpiar las listas de favoritos.

## Tecnologías utilizadas
- **Axios**: Para realizar solicitudes HTTP y gestionar la comunicación con APIs.
- **Vue.js**: Framework de JavaScript utilizado para construir la interfaz de usuario.
- **Pinia**: Librería de manejo de estado para Vue.js.
- **Tailwind CSS**: Framework de estilos para diseñar una interfaz moderna y responsiva.

---

Este proyecto combina tecnologías modernas para ofrecer una experiencia de usuario fluida y agradable. ¡Disfruta explorando los chistes en Bad-jokes-io!

## ¿Qué es un closure? ¿Dónde hay un closure en el código?
Un closure es cuando una función recuerda las variables del lugar donde fue creada, incluso después de que ese lugar haya terminado de ejecutarse. En tu app, podrías tener closures si usas funciones dentro de otras, como en eventos o callbacks de Axios.

## ¿Cuáles son los posibles efectos secundarios de una función? ¿Hay algún caso en tu código? ¿Son esperados? ¿Pueden evitarse?
Efectos secundarios son cosas que una función hace además de devolver un valor, como cambiar variables externas, modificar la UI o llamar a una API. En tu app, las funciones que actualizan el estado con Pinia o hacen solicitudes con Axios tienen efectos secundarios. Son esperados, pero puedes reducirlos asegurándote de que todo esté controlado y centralizado.