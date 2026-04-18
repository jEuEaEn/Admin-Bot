import express from "express"
import bcrypt from "bcrypt"

import userRoutes from "./Routes/UserRoutes.js"
import acudentsRoutes from "./Routes/AcudientesRoutes.js"
import cursorRoutes from "./Routes/CursosRoutes.js"
import subjectsRoutes from "./Routes/MateriasRoutes.js"
import registrationsRoutes from "./Routes/MatriculasRoutes.js"
import noteRoutes from "./Routes/NotasRoutes.js"
import teachersRoutes from "./Routes/ProfesoresRoutes.js"
import authRoutes from "./Routes/auth.routes.js"
import dashBoardsRoutes from "./Routes/dashboard.routes.js"


const app = express()
app.use(express.json())

app.use("/api", userRoutes)
app.use("/api", acudentsRoutes)
app.use("/api", cursorRoutes)
app.use("/api", subjectsRoutes)
app.use("/api", registrationsRoutes)
app.use("/api", noteRoutes)
app.use("/api", teachersRoutes)
app.use("/api", authRoutes)
app.use("/api", dashBoardsRoutes)

app.get("/",(req, res)=>{

    res.send("Api Funcionando")

})

const passwordList = [

    "JuanBlaBla",
    "JoelBlaBla",
    "AndresBlaBla",
    "AlejandroBlaBla",
    "GuillermoBlaBla"

]

for(let i = 0; i < passwordList.length; i++){

    const hash = await bcrypt.hash(passwordList[i], 10)
    console.log(`Contraseña: ${passwordList[i]}, hash: ${hash}`)

}

export default app