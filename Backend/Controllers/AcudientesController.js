import { getAcudientes, postAcudiente } from "../Models/AcudientesModel.js"

export const getAcudientesController = async (req, res) => {
    try {
        const data = await getAcudientes()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createAcudienteController = async (req, res) => {
    try {
        const {
            id_estudiante,
            nombres,
            apellidos,
            telefono,
            direccion
        } = req.body

        await postAcudiente(
            id_estudiante,
            nombres,
            apellidos,
            telefono,
            direccion
        )

        res.json({ message: "Acudiente creado" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}