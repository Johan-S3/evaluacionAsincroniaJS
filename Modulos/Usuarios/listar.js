// Importo la función solicitud desde el archivo archivo barril de la carpeta Helpers para realizar las peticiones HTTP.
import { solicitud } from "../Helpers/index.js";

// Exporto una función asíncrona llamada getUsuarios, que recibe el parámetro URL que es la URL base del API.
export const getUsuarios = async (URL) => {
    // Retorno el arreglo de usuarios obtenidos cuando se llama a la función solicitud pasando la ruta generada.
    return await solicitud(`${URL}/users`);
};