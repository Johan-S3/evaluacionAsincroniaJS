// Importo la función solicitud desde el archivo barril de la carpeta Helpers para realizar las peticiones HTTP.
import { solicitud } from "../Helpers/index.js";

// Exporto una función asíncrona llamada getUsuariosUserName, que recibe dos parámetros: El URL que es la URL base del APIy el username ingresado.
export const getUsuariosUserName = async (URL, username) => {
    // Llamo a la función solicitud pasando la ruta generada y almaceno los usuarios obtenidos en la variable usuarios.
    // Es decir, se deben almacenar los usuarios que coinciden con el username ingresado.
    const usuarios = await solicitud(`${URL}/users?username=${username}`);
    // Retorno el arreglo de usuarios obtenidos.
    return usuarios;
};