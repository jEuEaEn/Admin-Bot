import { Router } from "express"
import { getProfesoresController, createProfesorController } from "../Controllers/ProfesoresController.js"

const router = Router()

router.get("/profesores", getProfesoresController)
router.post("/profesores", createProfesorController)

export default router