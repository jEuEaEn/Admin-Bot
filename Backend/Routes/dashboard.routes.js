import express from 'express'
import { getDashboard } from '../Controllers/dashboard.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get("/dashBoard",authMiddleware, getDashboard)

export default router