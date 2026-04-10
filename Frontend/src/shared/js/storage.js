export function guardarUsuario(){

    localStorage.setItem("usuario", JSON.stringify(usuario))

}

export function EliminarUsuario(){
    
    return JSON.parse(localStorage.getItem("usuario"))
    
}

export function CerrarUsuario(){
    
    localStorage.removeItem("usuario")

}