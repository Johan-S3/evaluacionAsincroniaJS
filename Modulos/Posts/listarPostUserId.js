// Importo la función getPost donde se obtienen todos los post del API..
import { solicitud } from "../Helpers/solicitud.js";

// Exporto una función asíncrona llamada getPostUserId, que recibe la URL base y un objeto usuario como parámetros.
// En este metodo se obtienen los posts de cada usuario por medio del ID del user.
export const getPostUserId = async (URL, usuario) => {
    // Se retorna el resultado obtenido al llamar a la función solicitud, pasando la URL con el useuario.id para obtener las posts asociadas a ese usuario.
    return await solicitud(`${URL}/posts?userId=${usuario.id}`)
};