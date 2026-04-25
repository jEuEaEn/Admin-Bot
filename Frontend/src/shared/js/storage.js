export function guardarUsuario(usuario){

    localStorage.setItem("usuario", JSON.stringify(usuario))
    localStorage.setItem("auth", "true")

}

export function obtenerUsuario(){
    
    return JSON.parse(localStorage.getItem("usuario"))
    
}

export function cerrarUsuario(){
    
    localStorage.removeItem("usuario")
    localStorage.removeItem("auth")

}

export function verificarUsuario(){
    const user = obtenerUsuario()

    if(!user){
        window.location.href = "../../src/pages/auth/index.html"
    }else{
        window.location.href= "../../pages/dashboard/index.html"
    }
}