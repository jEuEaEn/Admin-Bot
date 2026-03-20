import { Router } from "express"
import { getMateriasController, createMateriaController } from "../Controllers/MateriasController.js"

const router = Router()

router.get("/materias", getMateriasController)
router.post("/materias", createMateriaController)

export default router