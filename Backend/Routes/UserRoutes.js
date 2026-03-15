import { Router } from "express"
import { getStudentsController, createStudentController } from "../Controllers/UserController.js"

const router = Router()

router.get("/students", getStudentsController)
router.post("/students", createStudentController)

export default router