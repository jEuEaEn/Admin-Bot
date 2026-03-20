import { Router } from "express"
import { getMatriculasController, createMatriculaController } from "../Controllers/MatriculasController.js"

const router = Router()

router.get("/matriculas", getMatriculasController)
router.post("/matriculas", createMatriculaController)

export default router