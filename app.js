// Se importa la URL base del archivo barril de Helpers. Esta URL es necesaria para hacer todas las solicitudes a la API.
import { URL } from "./Modulos/Helpers/index.js";
// Se importan las funciones donde se hacen las solicitudes desde los archivos barriles de cada rol.
import { getUsuarios, getUsuariosUserName } from "./Modulos/Usuarios/index.js";
import { getTodo } from "./Modulos/Tareas/index.js";
import { getAlbums } from "./Modulos/Albums/index.js";
import { getPhotos } from "./Modulos/Photos/index.js";
import { getPostTitulo, getPostUserId } from "./Modulos/Posts/index.js";
import { getCommets } from "./Modulos/Comments/index.js";



// Declaro variable a la cual le asigno una arrow funtion la cual retornará una promesa ya que se convierte en asincrona. El resultado de esta promesa es donde se almacena el resultado del ejercicio 1. Es decir, las tareas pendientes por cada usuario.
const getTareasPendings = async () => {
    try { //Uso try para recorrer el bloque de la funcion. Si en algun momento se llega a presentar un error automaticamente se manda al catch.
        // Declaro variable usuarios donde se almacenará los usuarios traidos de la peticion.
        const usuarios =  await getUsuarios(URL);
        // Se usa promise all para ejecutar multiples promesas (una por cada usuario). Luego, Recorro el arreglo de usuarios con "map", creando una promesa asíncrona para cada usuario y lo que retorne la funcion map es lo que retornará la función get usuarios si se cumple la promesa.
        return await Promise.all(usuarios.map(async (usuario) => {
        // Declaro varaible tareasPending que almacenará el arreglo donde se almacenan las tareas pendiente por cada usuario.
        const pendindTasks = await getTodo(URL, usuario);
        // Retorno un nuevo objeto que contiene los datos del usuario (...usuario) con sus tareas pendientes(tareasPending).
        return {...usuario, pendindTasks}
        }));
    } catch (error) { //En está sección se recibe el error que se generó en el catch y se muestra por consola.
        console.error(error);
    }
}


// Declaro variable a la cual le asigno una arrow funtion que recibe como parametro un username la cual retornará una promesa ya que se convierte en asincrona. El resultado de esta promesa es donde se almacena el resultado del ejercicio 2. Es decir, los usuarios con sus albunes y fotos dependiendo del username ingresado.
const getUserPorUserName = async (username) => {
    try { //Uso try para recorrer el bloque de la funcion. Si en algun momento se llega a presentar un error automaticamente se manda al catch.
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
    } catch (error) { //En está sección se recibe el error que se generó en el catch y se muestra por consola.
        console.error(error);
    }
}



// Declaro variable a la cual le asigno una arrow funtion la cual retornará una promesa ya que se convierte en asincrona. El resultado de esta promesa es donde se almacena el resultado del ejercicio 3. Es decir, los posts con sus comentarios dependiendo del nombre del post ingresado.
const getPostPorTitulo = async (titulo) => {
    try { //Uso try para recorrer el bloque de la funcion. Si en algun momento se llega a presentar un error automaticamente se manda al catch.
        // Declaro varaible "posts" donde se almacena el resultado obtenido al llamar al metodo donde se obtienen los post por el titulo ingresado, enviando como argumentos la URL y el titulo.
        const posts = await getPostTitulo(URL, titulo)
        // Se usa promise all para ejecutar multiples promesas (una por cada post). Luego, Recorro el arreglo de posts con "map", creando una promesa asíncrona para cada post.
        return await Promise.all(posts.map(async(post)=>{
        // Declaro la variable "comments" donde se almacenará el arreglo con los comentarios del post actual recibido de la petición.
        const comments = await getCommets(URL,post);
        // Retorno un nuevo objeto que contiene todas las propiedades de cada post y le agrego la propiedad "comments".
        return {...post, comments};
        }));
    } catch (error) { //En está sección se recibe el error que se generó en el catch y se muestra por consola.
        console.error(error);
    }
}



// Declaro variable a la cual le asigno una arrow funtion la cual retornará una promesa ya que se convierte en asincrona. El resultado de esta promesa es donde se almacena el resultado del ejercicio 4. Es decir, los usuarios solo con su nombre y su telefono.
const getUsersNamePhone = async () => {
    try { //Uso try para recorrer el bloque de la funcion. Si en algun momento se llega a presentar un error automaticamente se manda al catch.
      // Declaro variable usuarios donde se almacenará los usuarios traidos de la peticion.
      const usuarios =  await getUsuarios(URL);
      // Se usa promise all para ejecutar multiples promesas (una por cada usuario). Luego, Recorro el arreglo de usuarios con "map", creando una promesa asíncrona para cada usuario.
      return await Promise.all(usuarios.map(async(usuario)=>{
          // Retorno un nuevo objeto que contiene los datos del usuario (name y phone).
        return {
          "name": usuario.name,
          "phone": usuario.phone
          };
      }));
    } catch (error) { //En está sección se recibe el error que se generó en el catch y se muestra por consola.
      console.error(error);
    }
};



// Declaro variable a la cual le asigno una arrow funtion la cual retornará una promesa ya que se convierte en asincrona. El resultado de esta promesa es donde se almacena el resultado del ejercicio 5. Es decir, los usuarios con sus posts y respectivos comentarios y con sus albums y sus repectivas fotos.
const getAllData = async () => {
    try { //Uso try para recorrer el bloque de la funcion. Si en algun momento se llega a presentar un error automaticamente se manda al catch.
        // Declaro variable usuarios donde se almacenará los usuarios traidos de la peticion.
        const usuarios =  await getUsuarios(URL);
        // Se usa promise all para ejecutar multiples promesas (una por cada usuario). Luego, Recorro el arreglo de usuarios con "map", creando una promesa asíncrona para cada usuario.
        return await Promise.all(usuarios.map(async(usuario)=>{
            // Declaro la variable "posts" donde se almacenará el arreglo con los posts de cada usuario recibido de la petición.
            const posts = await getPostUserId(URL,usuario);
            // Declaro la variable "comentPost" donde se almacenará un arreglo con los posts, pero cada post tendrá también sus comentarios
            //  dentro. Para esto, uso "Promise.all" para recorrer cada post y obtener los comentarios asociados.
            const comentPost = await Promise.all( posts.map(async(post)=>{
                // Declaro la variable "coments" donde se almacenará el arreglo con los comentarios del post actual recibido de la petición.
                const coments = await getCommets(URL,post);
                // Retorno un nuevo objeto que contiene todas las propiedades de cada post y le agrego la propiedad "coments".
                return {...post,coments};
            }));
            // Declaro la variable "albums" donde se almacenará el arreglo con los albunes de cada usuario recibido de la petición.
            const albums = await getAlbums(URL,usuario);
            // Declaro la variable "albumPhoto" donde se almacenará un arreglo con los albunes, pero cada album tendrá también sus photos
            //  dentro. Para esto, uso "Promise.all" para recorrer cada album y obtener las photos asociados.
            const albumPhoto = await Promise.all( albums.map(async(album)=>{
                // Declaro la variable "photos" donde se almacenará el arreglo con las photos del album actual recibido de la petición.
                const photos = await getPhotos(URL,album);
                // Retorno un nuevo objeto que contiene todas las propiedades de cada album y le agrego la propiedad "photos".
                return {...album,photos};
            }));
            // Retorno un nuevo objeto que contiene los datos del usuario (...usuario), los post con sus comentarios (comentPost) y los albunes con sus fotos (albumPhoto).
            return {...usuario,comentPost, albumPhoto};
        }));
    } catch (error) { //En está sección se recibe el error que se generó en el catch y se muestra por consola.
        console.error(error);
    }
};



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
            case 3: //Si el valor es 3 entonces primero se ejecuta un bucle. Luego...
                // Declaro variable titulo por fuera del bucle para poder acceder a ella tambien por fuera del bucle.
                let titulo;
                // Creo bucle.
                do {
                // Le asigno a la variable titulo el valor ingresado por teclado
                titulo = prompt("Ingrese el titulo a buscar: ");
                } while (!titulo); //Mientras en titulo no sea null o esté vacio se sigue ejecutando el bucle.
                // Muestro por consola "Ejercicio 3" y se accede al resultado del metodo getPostPorTitulo enviando como argumento el titulo ingresado y se imprime por consola.
                console.log("\nEjercicio 3:");
                await getPostPorTitulo(titulo).then(data => {
                    // Se valida si el valor recibido del resultado de la promesa su longitud es diferente a 0, entonces...
                    if(data.length != 0) {
                        // Muestro por consola el arreglo de los posts.
                        console.log(data);
                    }
                    // Si no llega ser así entonces muestra mensaje por consola que indica que el usuario no se encontró.
                    else console.log("Ningún post coincide con el titulo ingresado.");
                });
                break;
            case 4: //Si el valor es 4 entonces muestro por consola "Ejercicio 4" y se accede al resultado del metodo getUsersNamePhone y se imprime por consola.
                console.log("\nEjercicio 4:");
                await getUsersNamePhone().then(data => console.log(data));
                break;
            case 5: //Si el valor es 5 entonces muestro por consola "Ejercicio 5" y se accede al resultado del metodo getAllData y se imprime por consola.
                console.log("\nEjercicio 5:");
                await getAllData().then(data => console.log(data));
                break;
            default:
                alert("Opcion ingresada no valida...");
                break;
        }
    }
}