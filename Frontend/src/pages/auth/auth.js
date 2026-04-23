import { request } from "../../shared/js/api.js";
import { validarCorreo, limpiarError, mostrarError } from "../../shared/js/utils.js";
import { guardarUsuario } from "../../shared/js/storage.js";

const form = document.getElementById("Auth-form")
const email = document.getElementById("Email")
const password = document.getElementById("Password")
const Button = document.getElementById("SignIn")
const error = document.getElementById("MErr")

console.log("inicio")

form.addEventListener('submit', async function (e) {
    e.preventDefault()

    limpiarError(error)

    const correo = email.value.trim()
    const PassWord = password.value.trim()

    if(!validarCorreo(correo)){

        mostrarError(error, "Correo Invalido")
        return
        
    }

    if(PassWord.length < 6){

        mostrarError(error, "La contraseña debe tener minimo 6 caracteres")
        return

    }try{

        const data = await request("/login", {
            method: "POST",
            body: { email: correo, password: PassWord}
        })

        console.log("DATA:", data)

        if (data.ok) {
            guardarUsuario(data);
            window.location.href = "../dashboard/index.html";
        } else {
            mostrarError(error, "Credenciales incorrectas");
        }

    }catch(err){

        mostrarError(error, "Error al iniciar secion")
        console.log(err)

    }
    finally{}

})