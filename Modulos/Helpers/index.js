// Declaro y asigno a una varaible la URL base que se usa para obtener los datos enviandosela a las funciones como argumentos para realizar las peticiones.
// Exporto está varaible que será usada en varios lugares dentro del programa .
export const URL = "https://jsonplaceholder.typicode.com";
// Tambien, se exporta la función solicitud porque tambien se llamará en varios lugares dentro del programa.
export { solicitud } from "./solicitud.js";