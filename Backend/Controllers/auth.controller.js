import bcrypt from "bcrypt"

import { FindUserByEmail } from "../Models/auth.model.js"

export const login = async (req, res)=>{

    try{

        const {email, password} = req.body
        
        if(!email || !password){

            return res.status(400).json({

                ok: false,
                Message: "Datos incompletos"

            })

        }

        const user = await FindUserByEmail(email)

        if(!user){

            return res.status(401).json({
                message: "Usuario no encontrado"
            })

        }

        const ValidarPassword = bcrypt.compare(password, user.password_hash)
        
        if(!ValidarPassword){

            return res.status(401).json({
                message: "Incorrect Password"
            })

        }

        return res.status(200).json({
            ok: true,
            message: "Login",
            user:{

                id: user.id,
                name: user.nombres,
                email: user.email

            }
        })

    }catch(err){
        return res.status(500).json({
            ok: false,
            message: "Error del Servidor",
            error: err
        })
    }

}