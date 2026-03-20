import { Router } from "express"
import { getCursosController, createCursoController } from "../Controllers/CursosController.js"

const router = Router()

router.get("/cursos", getCursosController)
router.post("/cursos", createCursoController)

export default router