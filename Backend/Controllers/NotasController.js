import { getNotas, postNota } from "../Models/NotasModel.js"

export const getNotasController = async (req, res) => {
    const data = await getNotas()
    res.json(data)
}

export const createNotaController = async (req, res) => {
    const { id_estudiante, id_materia, nota } = req.body
    await postNota(id_estudiante, id_materia, nota)
    res.json({ message: "Nota creada" })
}