// Importo la función solicitud desde el archivo barril de la carpeta Helpers para realizar las peticiones HTTP.
import { solicitud } from "../Helpers/index.js";

// Exporto una función asíncrona llamada getPhotos, que recibe la URL base y un objeto album como parámetros.
// En este metodo se obtienen las fotos de cada album por medio del ID del album.
export const getPhotos = async (URL, album) => {
    // Se retorna el resultado obtenido al llamar a la función solicitud, pasando la URL con el albumId para obtener las fotos asociadas a ese álbum.
    return await solicitud(`${URL}/photos?albumId=${album.id}`);
};