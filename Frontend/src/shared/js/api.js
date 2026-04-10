const Api_Url = "https://localhost:3000/api";

export async function request(endPoint, Options = {}){

    const response = await fetch(Api_Url+endPoint,{

        headers:{

            "Content-Type" : "application/json"

        },
        ...Options

    }) 

    const data = await response.json()

    if(!response.ok){

        throw new Error(data.message || "Error del servidor")

    }

    return data;
}