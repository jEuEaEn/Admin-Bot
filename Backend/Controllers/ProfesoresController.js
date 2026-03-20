import { getProfesores, postProfesor } from "../Models/ProfesoresModel.js"

export const getProfesoresController = async (req, res) => {
    const data = await getProfesores()
    res.json(data)
}

export const createProfesorController = async (req, res) => {
    const { nombres, apellidos, especialidad, telefono } = req.body
    await postProfesor(nombres, apellidos, especialidad, telefono)
    res.json({ message: "Profesor creado" })
}