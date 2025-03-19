// Importo la función solicitud desde el archivo barril de la carpeta Helpers para realizar las peticiones HTTP.
import { solicitud } from "../Helpers/index.js";

// Exporto una función asíncrona llamada getPost, que recibe el parámetro URL que es la URL base del API.
// En este metodo se obtienen todos los posts dentro del API.
export const getPost = async (URL) => {
    // Retorno el arreglo de los posts obtenidos cuando se llama a la función solicitud pasando la ruta generada.
    return await solicitud(`${URL}/posts`);
};