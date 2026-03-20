import { Router } from "express"
import { getNotasController, createNotaController } from "../Controllers/NotasController.js"

const router = Router()

router.get("/notas", getNotasController)
router.post("/notas", createNotaController)

export default router
