// Se importa la URL base del archivo barril de Helpers. Esta URL es necesaria para hacer todas las solicitudes a la API.
import { URL } from "./Modulos/Helpers/index.js";
// Se importan las funciones donde se hacen las solicitudes desde los archivos barriles de cada rol.
import { getUsuarios, getUsuariosUserName } from "./Modulos/Usuarios/index.js";
import { getTodo } from "./Modulos/Tareas/index.js";
import { getAlbums } from "./Modulos/Albums/index.js";
import { getPhotos } from "./Modulos/Photos/index.js";




// Declaro variable a la cual le asigno una arrow funtion la cual retornará una promesa ya que se convierte en asincrona. El resultado de esta promesa es donde se almacena el resultado del ejercicio 1. Es decir, las tareas pendientes por cada usuario.
const getTareasPendings = async () => {
    // Declaro variable usuarios donde se almacenará los usuarios traidos de la peticion.
    const usuarios =  await getUsuarios(URL);
    // Se usa promise all para ejecutar multiples promesas (una por cada usuario). Luego, Recorro el arreglo de usuarios con "map", creando una promesa asíncrona para cada usuario y lo que retorne la funcion map es lo que retornará la función get usuarios si se cumple la promesa.
    return await Promise.all(usuarios.map(async (usuario) => {
      // Declaro varaible tareasPending que almacenará el arreglo donde se almacenan las tareas pendiente por cada usuario.
      const pendindTasks = await getTodo(URL, usuario);
      // Retorno un nuevo objeto que contiene los datos del usuario (...usuario) con sus tareas pendientes(tareasPending).
      return {...usuario, pendindTasks}
    }));
}


// Declaro variable a la cual le asigno una arrow funtion que recibe como parametro un username la cual retornará una promesa ya que se convierte en asincrona. El resultado de esta promesa es donde se almacena el resultado del ejercicio 2. Es decir, los usuarios con sus albunes y fotos dependiendo del username ingresado.
const getUserPorUserName = async (username) => {
    // Declaro variable usuarios donde se almacenará los usuarios traidos de la peticion, en está petición se pasa como argumento la URL y el username recibido como parametro.
    const usuario = await getUsuariosUserName(URL, username);
    // Se usa promise all para ejecutar multiples promesas (una por cada usuario). Luego, Recorro el arreglo de usuarios con "map", creando una promesa asíncrona para cada usuario y lo que retorne la funcion map es lo que retornará la función getUserPorUserName si se cumple la promesa.
    return await Promise.all(usuario.map(async (usuario) => {
      // Declaro la variable "albums" donde se almacenará el arreglo con los albunes de cada usuario recibido de la petición.
      const albums = await getAlbums(URL, usuario);
      // Declaro la variable "albumPhoto" donde se almacenará un arreglo con los albunes, pero cada album tendrá también sus photos
      //  dentro. Para esto, uso "Promise.all" para recorrer cada album y obtener las photos asociados.
      const albumPhoto = await Promise.all(albums.map(async (album) => {
        // Declaro la variable "photos" donde se almacenará el arreglo con las photos del album actual recibido de la petición.
        const photos = await getPhotos(URL, album);
        // Retorno un nuevo objeto que contiene todas las propiedades de cada album y le agrego la propiedad "photos".
        return { ...album, photos };
      }));
      // Retorno un nuevo objeto que contiene los datos del usuario (...usuario) y los albums con sus fotos (albumPhoto).
      return {...usuario, albumPhoto};
    }));
}



// Creo bucle "While" infinito.
while (true) {
    // Declaro varaible "opcion" y le asigno e lvalor parseado a entero de la opcion ingresado por teclado.
    let opcion = parseInt(prompt("Ingrese el número del ejercicio que desea ejecutar:\n 1 - 5 | 6 para salir"));
    // Si opcion es falso, es decir, es null o está vacio entonces muestra una alerta y se salta directamente a otra iteración
    if(!opcion){ 
        alert("Debe ingresar un valor númerico entero.");
        continue;
    }else if(opcion === 6){ // Si la opcion es igual 6 entonces se muestra un alert y se cierra el programa.
        alert("Ok. Programa cerrado...");
        break;
    }else{ //Si no es así entonces...
        // Se empieza a evaluar por medio de una estructura de control switch.
        switch (opcion) {
            case 1: //Si el valor es 1 entonces muestro por consola "Ejercicio 1" y se acceder al resultado del metodo getTareasPendings y se imprime por consola.
                console.log("\nEjercicio 1:");
                await getTareasPendings().then(data => console.log(data));
                break; //Por ultimo se rompe la estructura.
            case 2: //Si el valor es 2 entonces primero se ejecuta un bucle infinito hasta que se ingrese un nombre y luego...
                // Declaro variable username por fuera del bucle para poder acceder a ella tambien por fuera del bucle.
                let username;
                // Creo bucle infinito.
                while (true) {
                    // Le asigno la a la variable username el valor ingresado por teclado
                    username = prompt("Ingrese el nombre del usuario a buscar: ");
                    // Por medio de un condicional valido si en la variable username se le asigno un valor diferente a null o a una cadena de texto vacia.
                    // Si es así, entonces se rompe el bucle.
                    if (username) break;
                    // Si no llega ser así entonces muestra que se debe ingresar un nombre.
                    alert("Debe ingresar un nombre.")
                }
                // Muestro por consola "Ejercicio 2" y se accede al resultado del metodo getUserPorUserName enviando como argumento el username ingresado y se imprime por consola.
                console.log("\nEjercicio 2:");
                await getUserPorUserName(username).then(data => {
                    // Se valida si el valor recibido del resultado de la promesa su longitud es diferente a 0, entonces...
                    if(data.length != 0) {
                        // por medio de un forEach recorro el arreglo recibido de la promesa y muestro pocision por pocision.
                        data.forEach(usuario => console.log(usuario));
                    }
                    // Si no llega ser así entonces muestra mensaje por consola que indica que el usuario no se encontró.
                    else console.log("Usuario no encontrado.");
                });
                break; //Por ultimo se rompe la estructura.
            default:
                alert("Opcion ingresada no valida...");
                break;
        }
    }
}