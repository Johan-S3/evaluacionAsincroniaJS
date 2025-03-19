// Importo la función solicitud desde el archivo archivo barril de la carpeta Helpers para realizar las peticiones HTTP.
import { solicitud } from "../Helpers/index.js";

// Exporto una función asíncrona llamada getTodo, que recibe la URL base y un objeto usuario como parámetros. Esta función se convierte en asincrona ya que necesitamos que el programa no se siga ejecutando hasta que no se cumpla la solicitud.
export const getTodo = async (URL, usuario) => {
    // Se retorna el resultado de llamar a la función solicitud, pasando la URL con el userId del usuario y determinando que el valor de su propiedad completad sea igual a false para obtener las tareas asociadas.
    // Es decir que lo que se retorna son los usuarios con tareas pendientes.
    return await solicitud(`${URL}/todos?userId=${usuario.id}&completed=false`);
};