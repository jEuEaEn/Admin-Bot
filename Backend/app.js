import express from "express"
import userRoutes from "./Routes/UserRoutes.js"
import acudentsRoutes from "./Routes/AcudientesRoutes.js"
import cursorRoutes from "./Routes/CursosRoutes.js"
import subjectsRoutes from "./Routes/MateriasRoutes.js"
import registrationsRoutes from "./Routes/MatriculasRoutes.js"
import noteRoutes from "./Routes/NotasRoutes.js"
import teachersRoutes from "./Routes/ProfesoresRoutes.js"

const app = express()
app.use(express.json())

app.use("/api", userRoutes)
app.use("/api", acudentsRoutes)
app.use("/api", cursorRoutes)
app.use("/api", subjectsRoutes)
app.use("/api", registrationsRoutes)
app.use("/api", noteRoutes)
app.use("/api", teachersRoutes)

export default app