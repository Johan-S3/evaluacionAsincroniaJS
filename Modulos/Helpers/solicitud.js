// Creo una funcion expresasada la cual es asincrona por ende debe ser retornable. Esta función se exporta.
export const solicitud = async url => {
    try { //Uso try para recorrer el bloque de la funcion. Si en algun momento se llega a presentar un error automaticamente se manda al catch.
        // A la varaible peticion se le asigna la peticion a la URL recibido como parametro.
        const peticion = await fetch(url);
        // En la variable data se almacena la respuesta de la peticion en formato JSON.
        const data = await peticion.json();
        // Por ultimo se retorna los datos obtenidos de la peticion.
        return data
    } catch (error) { //En está sección se recibe el error que se generó en el catch y se muestra por consola.
        console.error(error)
    }
}