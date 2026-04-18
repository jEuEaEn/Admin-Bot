import express from 'express'
import { getDashboard } from '../Controllers/dashboard.controller.js'

const router = express.Router()

router.get("/dashBoard", getDashboard)

export default router