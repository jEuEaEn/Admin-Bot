import { obtenerUsuario } from "./storage.js";

const Api_Url = "http://localhost:3000/api";
const user = obtenerUsuario()

export async function request(endPoint, options = {}){

    // Convertir body a JSON string si es un objeto
    let fetchOptions = { ...options };
    if (fetchOptions.body && typeof fetchOptions.body === 'object') {
        fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    const response = await fetch(Api_Url+endPoint,{

        headers:{

            "Content-Type" : "application/json",
            "x-auth": user? JSON.stringify(user):""

        },
        ...fetchOptions
        

    }) 

    const data = await response.json()

    if(!response.ok){

        throw new Error(data.message || "Error del servidor")

    }

    return data;
}