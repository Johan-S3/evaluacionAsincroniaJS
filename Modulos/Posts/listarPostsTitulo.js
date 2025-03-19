// Importo la función getPost donde se obtienen todos los post del API..
import { getPost } from "./index.js";

// Exporto una función asíncrona llamada getPost, que recibe el parámetro URL que es la URL base del API.
// En este metodo se obtienen todos los posts dentro del API.
export const getPostTitulo = async (URL, titulo) => {
    // Declaro una varaible donde se almacena una expresion regular que seria el titulo recibido como parametro.
    const regex = new RegExp(titulo)
    // Declaro la variable "posts" donde se almacenará el arreglo con los posts de cada usuario recibido de la petición.
    const posts = await getPost(URL);
    // Declaro variable "coindidencia" donde se almacenará el arreglo con los posts que en su propiedad title cumple con la expresion regular.
    const coindidencia = posts.filter(post => regex.test(post.title));
    // Retornor el arreglo de los posts que coinciden con el titulo recibido.
    return coindidencia;
};