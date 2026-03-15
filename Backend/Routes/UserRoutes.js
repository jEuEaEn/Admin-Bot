import express from 'express'

import { getStudents, postStudent } from '../Controllers/UserController.js'

const router = express.Router()

router.get("/Students", getStudents)
router.post("/Students", postStudent)

export default router