import { sendWhatsappMessage } from "./whatsapp.service.js";

export const sendMessage = async (req,res)=>{
    const {phone, message} = req.body

    try{
        const data = await sendWhatsappMessage(phone, message)

        res.status(200).json({
            ok: true,
            message: "Mensaje enviado",
            data:data
        })
    }catch(error){
        return req.status(500).json({
            ok:false,
            text: "error en el servidor",
            err: error
        })
    }
}

