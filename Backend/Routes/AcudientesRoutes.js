import { Router } from "express"
import { getAcudientesController, createAcudienteController } from "../Controllers/AcudientesController.js"

const router = Router()

router.get("/acudientes", getAcudientesController)
router.post("/acudientes", createAcudienteController)

export default router