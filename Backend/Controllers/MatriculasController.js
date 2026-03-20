import { getMatriculas, postMatricula } from "../Models/MatriculasModel.js"

export const getMatriculasController = async (req, res) => {
    const data = await getMatriculas()
    res.json(data)
}

export const createMatriculaController = async (req, res) => {
    const { id_estudiante, id_curso, fecha } = req.body
    await postMatricula(id_estudiante, id_curso, fecha)
    res.json({ message: "Matricula creada" })
}