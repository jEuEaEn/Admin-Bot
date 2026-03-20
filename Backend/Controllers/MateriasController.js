import { getMaterias, postMateria } from "../Models/MateriasModel.js"

export const getMateriasController = async (req, res) => {
    const data = await getMaterias()
    res.json(data)
}

export const createMateriaController = async (req, res) => {
    const { nombre, id_curso } = req.body
    await postMateria(nombre, id_curso)
    res.json({ message: "Materia creada" })
}