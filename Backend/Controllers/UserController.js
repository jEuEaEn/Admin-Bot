import { getStudents, postStudent } from "../Models/UserModels.js"

export const getStudentsController = async (req, res) => {

    try {

        const students = await getStudents()

        res.json(students)

    } catch (error) {

        res.status(500).json({
            message: "Error fetching students"
        })

    }

}

export const createStudentController = async (req, res) => {

    try {

        const {
            codigo_estudiante,
            nombres,
            apellidos,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,
            grado,
            anio_lectivo
        } = req.body

        await postStudent(
            codigo_estudiante,
            nombres,
            apellidos,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,
            grado,
            anio_lectivo
        )

        res.json({
            message: "Student created successfully"
        })

    } catch (error) {

        res.status(500).json({
            message: "Error creating student"
        })

    }

}