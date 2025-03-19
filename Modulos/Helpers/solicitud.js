// Creo una funcion expresasada la cual es asincrona por ende debe ser retornable. Esta función se exporta.
export const solicitud = async url => {
    // A la varaible peticion se le asigna la peticion a la URL recibido como parametro.
    const peticion = await fetch(url);
    // En la variable data se almacena la respuesta de la peticion en formato JSON.
    const data = await peticion.json();
    // Por ultimo se retorna los datos obtenidos de la peticion.
    return data
}