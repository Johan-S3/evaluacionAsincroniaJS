// Se importa la URL base del archivo barril de Helpers. Esta URL es necesaria para hacer todas las solicitudes a la API.
import { URL } from "./Modulos/Helpers/index.js";
// Se importan las funciones donde se hacen las solicitudes desde los archivos barriles de cada rol.
import { getUsuarios } from "./Modulos/Usuarios/index.js";
import { getTodo } from "./Modulos/Tareas/index.js";



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
            default:
                alert("Opcion ingresada no valida...");
                break;
        }
    }
}