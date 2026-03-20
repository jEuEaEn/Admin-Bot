import { getCursos, postCurso } from "../Models/CursosModel.js"

export const getCursosController = async (req, res) => {
    const data = await getCursos()
    res.json(data)
}

export const createCursoController = async (req, res) => {
    const { nombre, grado, id_profesor } = req.body
    await postCurso(nombre, grado, id_profesor)
    res.json({ message: "Curso creado" })
}