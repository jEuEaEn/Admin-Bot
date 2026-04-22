import { request } from "../../shared/js/api.js";
import { validarCorreo, limpiarError, mostrarError } from "../../shared/js/utils.js";
import { guardarUsuario } from "../../shared/js/storage.js";

const form = document.getElementById("Auth-form")
const email = document.getElementById("Email")
const password = document.getElementById("Password")
const Button = document.getElementById("SignIn")
const error = document.getElementById("MErr")


form.addEventListener('submit', async function (e) {
    e.preventDefault()

    limpiarError()

    const correo = email.value.trim()
    const usuario = usuario.value.trim()

    if(!validarCorreo(correo)){

        mostrarError(error, "Correo Invalido")
        return
        
    }

    if(password.length < 6){

        mostrarError(error, "La contraseña debe tener minimo 6 caracteres")
        return

    }

    try{}
    catch{}
    finally{}

})