// Importo la función solicitud desde el archivo barril de la carpeta Helpers para realizar las peticiones HTTP.
import { solicitud } from "../Helpers/index.js";

// Exporto una función asíncrona llamada getAlbums, que recibe la URL base y un objeto usuario como parámetros.
// En este metodo se obtienen los albums de cada usuario por medio de su ID.
export const getAlbums = async (URL, usuario) => {
    // Se retorna el resultado obtenido al llamar a la función solicitud, pasando la URL con el userId del usuario para obtener los álbumes asociados.
    return await solicitud(`${URL}/albums?userId=${usuario.id}`);
};