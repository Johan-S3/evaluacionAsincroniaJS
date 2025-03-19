// Importo la función solicitud desde el archivo barril de la carpeta Helpers para realizar las peticiones HTTP.
import { solicitud } from "../Helpers/index.js";

// Exporto una función asíncrona llamada getCommets, que recibe la URL base y un objeto post como parámetros.
// En este metodo se obtienen todos los posts dentro del API.
export const getCommets = async (URL, post) => {
    // Se retorna el resultado recibido al llamar a la función solicitud, pasando la URL con el postId para obtener los comentarios asociados a ese post.
    return await solicitud(`${URL}/comments?postId=${post.id}`);
};